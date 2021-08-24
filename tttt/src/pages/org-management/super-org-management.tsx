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
  GridRowId,
  GridCellParams,
} from '@material-ui/data-grid';
import getOrgManagement from './super/get-roles-query';
import localeText from 'configs/data-grid-locale-text';
import OrgManagementToolbar from './super/org-management-toolbar';
import DelRolesDialog from './super/del-roles-dialog';
import UpdateRolesData from './super/update-roles-data';

interface NeedChangeDataProps {
  id: number;
  org_name: string;
  org_role_description: string;
}

function SuperOrgManagement() {
  const theme = useTheme();
  const { data, isLoading, isError, isIdle } = getOrgManagement(1);
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [individualDeleteAlertOpen, setIndividualDeleteAlertOpen] =
    React.useState<boolean>(false);
  const [roleEditorOpen, setRoleEditorOpen] = React.useState<boolean>(false);
  const [delType, setDelType] = React.useState<1 | 2>(1); // 1 单个删除  2 批量删除
  const [editedRoleId, setEditedRoleId] = React.useState<number>();
  const [needChangeData, setNeedChangeData] = React.useState<
    NeedChangeDataProps | undefined
  >();
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
        field: 'org_name',
        headerName: '组织名称',
        flex: 1,
      },
      {
        field: 'org_role_description',
        headerName: '组织简介',
        flex: 5,
      },
      {
        field: 'operations',
        headerName: '操作',
        width: 180,
        align: 'center',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ({ id, row }: GridCellParams) => {
          return (
            <ButtonGroup
              variant="outlined"
              size="small"
              css={{ textAlign: 'center' }}
            >
              <Button
                onClick={() => {
                  setEditedRoleId(id as number);
                  setNeedChangeData({
                    id: row.id,
                    org_name: row.org_name,
                    org_role_description: row.org_role_description,
                  });
                  setRoleEditorOpen(true);
                }}
              >
                修改
              </Button>
              <Button
                onClick={() => {
                  setEditedRoleId(id as number);
                  setIndividualDeleteAlertOpen(true);
                  setDelType(1);
                }}
              >
                删除
              </Button>
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
        组织管理管理
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
            Toolbar: OrgManagementToolbar,
          }}
          componentsProps={{
            toolbar: {
              isBatchDeleteAvailable: Boolean(selectionModel.length),
              setBatchDeleteAlertOpen: setIndividualDeleteAlertOpen,
              setRoleEditorOpen: setRoleEditorOpen,
              setEditedRoleId: setEditedRoleId,
              setDelType: setDelType,
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
      <DelRolesDialog
        open={individualDeleteAlertOpen}
        setIndividualDeleteAlertOpen={setIndividualDeleteAlertOpen}
        type={delType}
      />
      <UpdateRolesData
        id={editedRoleId}
        roleEditorOpen={roleEditorOpen}
        setRoleEditorOpen={setRoleEditorOpen}
        data={needChangeData}
      />
    </Paper>
  );
}

export default SuperOrgManagement;
