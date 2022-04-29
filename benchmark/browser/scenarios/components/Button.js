import * as React from 'react';
import { ITEM_COUNT } from '../constants';

const Button = React.forwardRef(function Button(props, ref) {
  return <button ref={ref} {...props} />;
});

export default function Components() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <Button>test case</Button>
      ))}
    </React.Fragment>
  );
}
