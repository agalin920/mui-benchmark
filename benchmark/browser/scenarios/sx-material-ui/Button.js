import * as React from 'react';
import Button from '@mui/material/Button';
import { ITEM_COUNT } from '../constants';

export default function SxPropButtonMaterialUI() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <Button
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
        </Button>
      ))}
    </React.Fragment>
  );
}
