import * as React from 'react';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ITEM_COUNT } from '../constants';

const SelectStyled = styled(Select)(
  ({ theme }) => `
  width: 200px;
  height: 200px;
  border-width: 3px;
  border-color: white;
  :hover {
    background-color: ${theme.palette.secondary.dark};
  }
`,
);

export default function StyledMaterialUI() {
  return (
    <React.Fragment>
        <SelectStyled>
      {new Array(ITEM_COUNT).fill().map((id, idx) => (
          <MenuItem>{idx}</MenuItem>
          ))}
        </SelectStyled>
    </React.Fragment>
  );
}
