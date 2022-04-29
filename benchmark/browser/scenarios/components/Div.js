import * as React from 'react';
import { ITEM_COUNT } from '../constants';

const Div = React.forwardRef(function Div(props, ref) {
  return <div ref={ref} {...props} />;
});

export default function Components() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <Div>test case</Div>
      ))}
    </React.Fragment>
  );
}
