/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridRowId,
  GridCellParams,
} from '@material-ui/data-grid';
import { useTheme } from '@emotion/react';

import localeText from 'configs/data-grid-locale-text';
import useRolesQuery from './role-manage/use-roles-query';
import CustomGridToolbar from './role-manage/custom-grid-toolbar';
import BatchDeleteAlert from './role-manage/batch-delete-alert';
import IndividualDeleteAlert from './role-manage/individual-delete-alert';
import RoleEditor from './role-manage/role-editor';

function RoleManage() {
  const theme = useTheme();
  const { data, isLoading, isError, isIdle } = useRolesQuery();
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

  const [batchDeleteAlertOpen, setBatchDeleteAlertOpen] = React.useState(false);
  const [individualDeleteAlertOpen, setIndividualDeleteAlertOpen] =
    React.useState(false);
  const [roleEditorOpen, setRoleEditorOpen] = React.useState(false);
  const [editedRoleId, setEditedRoleId] = React.useState<number>();

  const columns = React.useMemo<GridColDef[]>(
    () => [
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
        flex: 1,
      },
      {
        field: 'resource_number',
        headerName: '渠道编号',
        flex: 1,
      },
      {
        field: 'resource_name',
        headerName: '渠道名称',
        flex: 1,
      },
      {
        field: 'role_description',
        headerName: '描述',
        flex: 2,
      },
      {
        field: 'role_status',
        headerName: '角色状态',
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams) => {
          return params.value ? '启用' : '禁用';
        },
      },
      {
        field: 'operations',
        headerName: '操作',
        width: 180,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ({ id }: GridCellParams) => {
          return (
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={() => {
                  setEditedRoleId(id as number);
                  setRoleEditorOpen(true);
                }}
              >
                修改
              </Button>
              <Button
                onClick={() => {
                  setEditedRoleId(id as number);
                  setIndividualDeleteAlertOpen(true);
                }}
              >
                删除
              </Button>
              <Button>配置权限</Button>
            </ButtonGroup>
          );
        },
      },
    ],
    [],
  );

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
        角色管理
      </Typography>
      <Divider css={{ marginBottom: theme.spacing(4) }} />
      <div
        css={{
          flexGrow: 1,
        }}
      >
        <DataGrid
          loading={isIdle || isLoading}
          error={isError || undefined}
          localeText={localeText}
          rows={data ?? []}
          columns={columns}
          components={{
            Toolbar: CustomGridToolbar,
          }}
          componentsProps={{
            toolbar: {
              isBatchDeleteAvailable: Boolean(selectionModel.length),
              setBatchDeleteAlertOpen: setBatchDeleteAlertOpen,
              setRoleEditorOpen: setRoleEditorOpen,
              setEditedRoleId: setEditedRoleId,
            },
          }}
          checkboxSelection
          disableSelectionOnClick
          disableColumnReorder={true}
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection.selectionModel);
          }}
          selectionModel={selectionModel}
          autoPageSize
          onPageSizeChange={() => {
            console.log('onPageSizeChange');
          }}
        />
      </div>
      <BatchDeleteAlert
        open={batchDeleteAlertOpen}
        setBatchDeleteAlertOpen={setBatchDeleteAlertOpen}
      />
      <IndividualDeleteAlert
        open={individualDeleteAlertOpen}
        setIndividualDeleteAlertOpen={setIndividualDeleteAlertOpen}
      />
      <RoleEditor
        id={editedRoleId}
        roleEditorOpen={roleEditorOpen}
        setRoleEditorOpen={setRoleEditorOpen}
      />
    </Paper>
  );
}

export default RoleManage;
