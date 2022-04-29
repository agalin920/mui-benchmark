import * as React from 'react';
import { styled } from '@mui/material/styles';
import TexField from '@mui/material/TextField';
import { ITEM_COUNT } from '../constants';

const TexFieldStyled = styled(TexField)(
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
      {new Array(ITEM_COUNT).fill().map(() => (
        <TexFieldStyled placeholder="test case" />
      ))}
    </React.Fragment>
  );
}
