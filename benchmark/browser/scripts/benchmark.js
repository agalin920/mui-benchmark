/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const fse = require('fs-extra');
const path = require('path');
const playwright = require('playwright');
const handler = require('serve-handler');
const http = require('http');

const PORT = 1122;

function createServer(options) {
  const { port } = options;
  const server = http.createServer((request, response) => {
    return handler(request, response, { public: path.resolve(__dirname, '../') });
  });

  function close() {
    return new Promise((resolve, reject) => {
      server.close((error) => {
        if (error !== undefined) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve({ close });
    });
  });
}

async function createBrowser() {
  const browser = await playwright.chromium.launch();
  
  return {
    openPage: async (url) => {
      const page = await browser.newPage();
      await page.goto(url);

      return page;
    },
    close: () => browser.close(),
  };
}

function getMedian(values) {
  const length = values.length;
  values.sort();
  if (length % 2 === 0) {
    return (values[length / 2] + values[length / 2 - 1]) / 2;
  }
  return values[parseInt(length / 2, 10)];
}

function getMean(values) {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
}

function getStdDev(values) {
  const mean = getMean(values);

  const squareDiffs = values.map((value) => {
    const diff = value - mean;
    return diff * diff;
  });

  return Math.sqrt(getMean(squareDiffs));
}

function format(time) {
  const i = Number(`${Math.round(`${time}e2`)}e-2`).toFixed(2);
  return 10 / i > 1 ? `0${i}` : i;
}

const printMeasure = (name, stats, baseline) => {
  console.log(`${name}:`);

  if (baseline) {
    console.log(
      `  ${Math.round((stats.mean / baseline.mean) * 100)} ±${Math.round(
        (stats.stdDev / baseline.mean) * 100,
      )}%`,
    );
  } else {
    console.log(`  ${format(stats.mean)} ±${format(stats.stdDev)}ms`);
  }
};

/**
 * @param {{ openPage: (url: any) => Promise<import('playwright').Page>}} browser
 * @param {string} testCaseName
 * @param {string} testCase
 * @param {*} baseline
 */
async function runMeasures(browser, testCaseName, testCase, baseline) {
  const samples = [];

  for (let i = 0; i < 15; i += 1) {
    const url = `http://localhost:${PORT}/?${testCase}`;
    const page = await browser.openPage(url);

    const benchmark = await page.evaluate(() => {
      return window.timing.render;
    });

    samples.push(benchmark);
    await page.close();
  }

  const sortedSamples = [...samples.concat()].sort();

  const stats = {
    samples,
    sampleCount: samples.length,
    mean: getMean(samples),
    median: getMedian(samples),
    min: sortedSamples[0],
    max: sortedSamples[sortedSamples.length - 1],
    stdDev: getStdDev(samples),
  };

  printMeasure(testCaseName, stats, baseline);

  return stats;
}

async function run() {
  const workspaceRoot = path.resolve(__dirname, '../../../');
  const outputDir = path.join(workspaceRoot, 'tmp', 'benchmarks');
  const [server, browser] = await Promise.all([
    createServer({ port: PORT }),
    createBrowser(),
    fse.mkdirp(outputDir),
  ]);

  const outputFile = fse.createWriteStream(path.join(outputDir, 'browser.log'));
  // `node benchmark.js | tee outputFile`
  // `process.stdout.pipe(outputFile)` keeps the process hanging.
  const stdoutWrite = process.stdout.write;
  process.stdout.write = function writePiped(...args) {
    stdoutWrite.apply(this, args);
    outputFile.write(...args);
  };

  try {
    const cases = [
      // Test that there no significant offset
      {
        name: 'noop (baseline)',
        path: './noop/index.js',
      },
      // {
      //   name: 'Table',
      //   path: './table-cell/index.js',
      // },
      // Test the cost of React primitives
      {
        name: 'React primitives - Div',
        path: './primitives/Div.js',
      },
      {
        name: 'React primitives - Button',
        path: './primitives/Button.js',
      },
      {
        name: 'React primitives - Input',
        path: './primitives/Input.js',
      },
      {
        name: 'React primitives - Select',
        path: './primitives/Select.js',
      },
      {
        name: 'React primitives - Select Options',
        path: './primitives/SelectOptions.js',
      },
      // Test the cost of React components abstraction
      {
        name: 'React components - Div',
        path: './components/Div.js',
      },
      {
        name: 'React components - Button',
        path: './components/Button.js',
      },
      {
        name: 'React components - Input',
        path: './components/Input.js',
      },
      {
        name: 'React components - Select',
        path: './components/Select.js',
      },
      {
        name: 'React components - Select Options',
        path: './components/SelectOptions.js',
      },
      // Test that @mui/styled-engine doesn't add an significant overhead
      {
        name: 'Styled MUI - Box',
        path: './styled-material-ui/Box.js',
      },
      {
        name: 'Styled MUI - Button',
        path: './styled-material-ui/Button.js',
      },
      {
        name: 'Styled MUI - TextField',
        path: './styled-material-ui/TextField.js',
      },
      {
        name: 'Styled MUI - Select',
        path: './styled-material-ui/Select.js',
      },
      {
        name: 'Styled MUI - Select Options',
        path: './styled-material-ui/SelectOptions.js',
      },
      // Test that sx prop doesn't add an significant overhead
      {
        name: 'Sx MUI - Box',
        path: './sx-material-ui/Box.js',
      },
      {
        name: 'Sx MUI - Button',
        path: './sx-material-ui/Box.js',
      },
      {
        name: 'Sx MUI - TextField',
        path: './sx-material-ui/TextField.js',
      },
      {
        name: 'Sx MUI - Select',
        path: './sx-material-ui/Select.js',
      },
      {
        name: 'Sx MUI - Select Options',
        path: './sx-material-ui/SelectOptions.js',
      },
    ];

    let baseline;

    for (let i = 0; i < cases.length; i += 1) {
      const stats = await runMeasures(browser, cases[i].name, cases[i].path, baseline);

      if (i === 1) {
        baseline = stats;
      }
    }
  } finally {
    await Promise.all([browser.close(), server.close()]);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
