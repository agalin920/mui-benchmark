import * as React from 'react';
import Box from '@mui/material/Box';
import { ITEM_COUNT } from '../constants';

export default function SxPropBoxMaterialUI() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <Box
          sx={{
            width: 200,
            height: 200,
            borderWidth: '3px',
            borderColor: 'white',
            backgroundColor: ['primary.main', 'text.primary', 'background.paper'],
            borderStyle: ['dashed', 'solid', 'dotted'],
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.dark,
            },
          }}
        >
          test case
        </Box>
      ))}
    </React.Fragment>
  );
}
