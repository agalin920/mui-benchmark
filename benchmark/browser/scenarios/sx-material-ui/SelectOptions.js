import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ITEM_COUNT } from '../constants';

export default function SxPropButtonMaterialUI() {
  return (
    <React.Fragment>
        <Select
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
          {new Array(ITEM_COUNT).fill().map((id, idx) => (
          <MenuItem>{idx}</MenuItem>
          ))}
        </Select>
    </React.Fragment>
  );
}
