/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { useTheme } from '@emotion/react';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridRowId,
  GridCellParams,
} from '@material-ui/data-grid';
import localeText from 'configs/data-grid-locale-text';
import useUsersQuery from './user-manage/use-user-query';
import UserGridToolbar from './user-manage/user-grid-toolbar';
import EditorUser from './user-manage/edit-user';
import UserDelDialog from './user-manage/user-del-dialog';

function UserManage() {
  const { data, isLoading, isIdle } = useUsersQuery();
  const theme = useTheme();
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [editUserId, setEditUserId] = React.useState<number>();
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  const [delUserOpen, setDelUserOpen] = React.useState(false);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
      sortable: false,
      filterable: false,
    },
    {
      field: 'user_name',
      headerName: '人员名称',
      flex: 1,
    },
    {
      field: 'user_id',
      headerName: '账号',
      flex: 1,
    },
    {
      field: 'user_mail',
      headerName: '邮箱',
      flex: 1,
    },
    {
      field: 'user_phone',
      headerName: '手机号',
      flex: 1,
    },
    {
      field: 'user_structuer',
      headerName: '组织机构',
      flex: 1,
    },
    {
      field: 'user_type',
      headerName: '角色',
      flex: 1,
    },
    {
      field: 'user_status',
      headerName: '人员状态',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        return params.value ? '启用' : '禁用';
      },
    },
    {
      field: 'operations',
      headerName: '操作',
      width: 220,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ id, row }: GridCellParams) => {
        return (
          <ButtonGroup variant="outlined" size="small">
            <Button>赋予角色</Button>
            <Button
              onClick={() => {
                setEditUserId(id as number);
                setEditUserOpen(true);
              }}
            >
              修改
            </Button>
            <Button>禁用</Button>
            <Button
              onClick={() => {
                setEditUserId(row.user_id as number);
                setDelUserOpen(true);
              }}
            >
              删除
            </Button>
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
        人员管理
      </Typography>

      <Divider css={{ marginBottom: theme.spacing(4) }} />
      <div
        css={{
          flexGrow: 1,
        }}
      >
        <DataGrid
          loading={isIdle || isLoading}
          rows={data ? data : []}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          localeText={localeText}
          components={{
            Toolbar: UserGridToolbar,
          }}
          componentsProps={{
            toolbar: {
              isBatchDeleteAvailable: Boolean(selectionModel.length),
              setEditUserId: setEditUserId,
              setEditUserOpen: setEditUserOpen,
              selectionModel: selectionModel,
            },
          }}
          disableColumnReorder={true}
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection.selectionModel);
          }}
          autoPageSize
        />
      </div>
      {editUserId ? (
        <UserDelDialog
          open={delUserOpen}
          userId={editUserId}
          setDelOpen={setDelUserOpen}
        />
      ) : null}

      <EditorUser
        id={editUserId}
        userEditorOpen={editUserOpen}
        setUserEditorOpen={setEditUserOpen}
      />
    </Paper>
  );
}

export default UserManage;
