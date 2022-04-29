import * as React from 'react';
import { ITEM_COUNT } from '../constants';

const Input = React.forwardRef(function Input(props, ref) {
  return <input ref={ref} {...props} />;
});

export default function Components() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <Input placeholder="test case"/>
      ))}
    </React.Fragment>
  );
}
