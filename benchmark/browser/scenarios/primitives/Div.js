import * as React from 'react';
import { ITEM_COUNT } from '../constants';

export default function Primitives() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <div>test case</div>
      ))}
    </React.Fragment>
  );
}
