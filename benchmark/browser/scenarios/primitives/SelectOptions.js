import * as React from 'react';
import { ITEM_COUNT } from '../constants';

export default function Primitives() {
  return (
    <React.Fragment>
        <select>
      {new Array(ITEM_COUNT).fill().map((i, idx) => (
        <option>{idx}</option>
        ))}
      </select>
    </React.Fragment>
  );
}
