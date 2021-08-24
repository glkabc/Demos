/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@material-ui/data-grid';
import { useTheme } from '@emotion/react';

import { Button, ButtonGroup } from '@material-ui/core';

interface Props {
  isBatchDeleteAvailable: boolean;
  setSelectRows: React.Dispatch<React.SetStateAction<object>>;
  setRoleEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RoleListToolbar({
  isBatchDeleteAvailable,
  setSelectRows,
  setRoleEditOpen,
}: Props) {
  const theme = useTheme();

  return (
    <GridToolbarContainer css={{ margin: theme.spacing(1, 0) }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <ButtonGroup
        variant="contained"
        color="primary"
        size="small"
        css={{ marginLeft: theme.spacing(2) }}
      >
        <Button
          onClick={() => {
            setSelectRows({});
            setRoleEditOpen(true);
          }}
        >
          添加
        </Button>
        <Button disabled={!isBatchDeleteAvailable}>批量删除</Button>
      </ButtonGroup>
    </GridToolbarContainer>
  );
}

export default RoleListToolbar;
