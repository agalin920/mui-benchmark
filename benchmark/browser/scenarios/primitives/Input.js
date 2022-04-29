import * as React from 'react';
import { ITEM_COUNT } from '../constants';

export default function Primitives() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <input placeholder="test case" />
      ))}
    </React.Fragment>
  );
}
