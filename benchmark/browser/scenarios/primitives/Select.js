import * as React from 'react';
import { ITEM_COUNT } from '../constants';

export default function Primitives() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      ))}
    </React.Fragment>
  );
}
