import * as React from 'react';
import { ITEM_COUNT } from '../constants';

const Select = React.forwardRef(function Select(props, ref) {
  return <select ref={ref} {...props} />;
});

const Option = React.forwardRef(function Option(props, ref) {
  return <option ref={ref} {...props} />;
});

export default function Components() {
  return (
    <React.Fragment>
      <Select>
        {new Array(ITEM_COUNT).fill().map((i, idx) => (
          <Option>{idx}</Option>
        ))}
      </Select>
    </React.Fragment>
  );
}
