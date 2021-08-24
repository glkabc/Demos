/** @jsxImportSource @emotion/react */
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
  setBatchDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRoleEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedRoleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDelType: React.Dispatch<React.SetStateAction<number>>;
}

function OrgManagementToolbar({
  isBatchDeleteAvailable,
  setBatchDeleteAlertOpen,
  setRoleEditorOpen,
  setEditedRoleId,
  setDelType,
}: Props) {
  const theme = useTheme();

  const handelClickDel = () => {
    setDelType(2);
    setBatchDeleteAlertOpen(true);
  };
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
            setEditedRoleId(undefined);
            setRoleEditorOpen(true);
          }}
        >
          添加
        </Button>
        <Button disabled={!isBatchDeleteAvailable} onClick={handelClickDel}>
          批量删除
        </Button>
      </ButtonGroup>
    </GridToolbarContainer>
  );
}

export default OrgManagementToolbar;
