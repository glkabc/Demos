/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Button,
  ButtonGroup,
  Toolbar,
} from '@material-ui/core';
import { useTheme } from '@emotion/react';
import {
  DataGrid,
  GridColDef,
  // GridValueFormatterParams,
  GridRowId,
  GridCellParams,
} from '@material-ui/data-grid';
import localeText from 'configs/data-grid-locale-text';
import useRoleListsQuery from './role-list/use-roleLists-query';
import RoleListToolbar from './role-list/role-list-toolbar';
import RoleFormListsType from './role-list/role-formLists-type';
import RoleEdit from './role-list/role-edit';

function RoleList() {
  const theme = useTheme();
  const { data, isLoading, isIdle } = useRoleListsQuery();
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [selectRows, setSelectRows] = React.useState<RoleFormListsType>({});
  const [roleEditOpen, setRoleEditOpen] = React.useState(false);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
      sortable: false,
      filterable: false,
    },
    {
      field: 'role_name',
      headerName: '角色名称',
      width: 220,
    },
    {
      field: 'role_code',
      headerName: '角色编码',
      width: 220,
    },
    {
      field: 'role_comments',
      headerName: '备注',
      flex: 1,
    },

    {
      field: 'operations',
      headerName: '操作',
      width: 320,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ id, row }: GridCellParams) => {
        return (
          <ButtonGroup variant="outlined" size="small">
            <Button>赋予权限</Button>
            <Button
              onClick={() => {
                setSelectRows(row);
                setRoleEditOpen(true);
              }}
            >
              修改
            </Button>
            <Button>删除</Button>
          </ButtonGroup>
        );
      },
    },
  ];
  return (
    <Paper
      square
      elevation={0}
      css={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        css={{
          padding: theme.spacing(2),
        }}
      >
        角色列表
      </Typography>
      <Divider css={{ marginBottom: theme.spacing(4) }} />
      <div css={{ flexGrow: 1 }}>
        <DataGrid
          loading={isIdle || isLoading}
          rows={data ? data : []}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          localeText={localeText}
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection.selectionModel);
          }}
          autoPageSize
          components={{ Toolbar: RoleListToolbar }}
          componentsProps={{
            toolbar: {
              isBatchDeleteAvailable: Boolean(selectionModel.length),
              setSelectRows: setSelectRows,
              setRoleEditOpen: setRoleEditOpen,
            },
          }}
        />
      </div>
      <RoleEdit
        roleEditOpen={roleEditOpen}
        setRoleEditOpen={setRoleEditOpen}
        selectRows={selectRows}
      />
    </Paper>
  );
}

export default RoleList;
