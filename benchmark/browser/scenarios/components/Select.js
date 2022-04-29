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
      {new Array(ITEM_COUNT).fill().map(() => (
        <Select>
          <Option>1</Option>
          <Option>2</Option>
          <Option>3</Option>
          <Option>4</Option>
          <Option>5</Option>
        </Select>
      ))}
    </React.Fragment>
  );
}
