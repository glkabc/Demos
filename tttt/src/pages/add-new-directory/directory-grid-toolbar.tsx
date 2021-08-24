/** @jsxImportSource @emotion/react */
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@material-ui/data-grid';
import { useTheme } from '@emotion/react';

import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';
import { IDirectoryProps } from './use-new-directory-query';

interface Props {
  isBatchDeleteAvailable: boolean;
  setBatchDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRoleEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorType: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  setDelData: React.Dispatch<
    React.SetStateAction<IDirectoryProps[] | IDirectoryProps>
  >;
  data: IDirectoryProps[];
  selectionModel: string[];
}

function CustomGridToolbar({
  isBatchDeleteAvailable,
  setBatchDeleteAlertOpen,
  setRoleEditorOpen,
  setEditorType,
  setDelData,
  data,
  selectionModel,
}: Props) {
  const theme = useTheme();
  const handleClickBatchDel = (): void => {
    let newList: IDirectoryProps[] = [];
    selectionModel.forEach((v) => {
      data.forEach((r, i) => {
        if (i === Number(v)) {
          newList.push(r);
        }
      });
    });
    setDelData(newList);
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
            setEditorType(0);
            setRoleEditorOpen(true);
          }}
        >
          添加
        </Button>
        <Button
          disabled={!isBatchDeleteAvailable}
          onClick={handleClickBatchDel}
        >
          批量删除
        </Button>
      </ButtonGroup>
    </GridToolbarContainer>
  );
}

export default CustomGridToolbar;
