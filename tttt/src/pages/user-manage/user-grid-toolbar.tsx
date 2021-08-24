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
import UserBatchDel from './user-batch-del';

interface Props {
  isBatchDeleteAvailable: boolean;
  setBatchDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectionModel: number[] | [];
}

function UserGridToolbar({
  isBatchDeleteAvailable,
  setBatchDeleteAlertOpen,
  setEditUserOpen,
  setEditUserId,
  selectionModel,
}: Props) {
  const theme = useTheme();
  const [userBatchDel, setUserBatchDel] = React.useState(false);
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
            setEditUserId(undefined);
            setEditUserOpen(true);
          }}
        >
          添加
        </Button>
        <Button
          disabled={!isBatchDeleteAvailable}
          onClick={() => {
            setUserBatchDel(true);
          }}
        >
          批量删除
        </Button>
      </ButtonGroup>
      {userBatchDel ? (
        <UserBatchDel
          open={userBatchDel}
          setBatchDelOpen={setUserBatchDel}
          selectData={selectionModel}
        />
      ) : null}
    </GridToolbarContainer>
  );
}

export default UserGridToolbar;
