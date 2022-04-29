import * as React from 'react';
import TextField from '@mui/material/TextField';
import { ITEM_COUNT } from '../constants';

export default function SxPropTextFieldMaterialUI() {
  return (
    <React.Fragment>
      {new Array(ITEM_COUNT).fill().map(() => (
        <TextField
          placeholder="test case"
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
        />
      ))}
    </React.Fragment>
  );
}
