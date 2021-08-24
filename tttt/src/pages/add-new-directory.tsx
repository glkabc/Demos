/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  ButtonGroup,
  Button,
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
import DirectoryGridToolbar from './add-new-directory/directory-grid-toolbar';
import useGetNewDirectoryListQuery, {
  IDirectoryProps,
} from './add-new-directory/use-new-directory-query';
import DelDirectoryDialog from './add-new-directory/del-directory-dialog';
import EditorDirectoryDialog from './add-new-directory/editor-directory-dialog';

function AddNewDirectory(): React.ReactElement {
  const theme = useTheme();
  const { data, isLoading, isError, isIdle } = useGetNewDirectoryListQuery();
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [batchDeleteAlertOpen, setBatchDeleteAlertOpen] =
    React.useState<boolean>(false);
  const [roleEditorOpen, setRoleEditorOpen] = React.useState<boolean>(false);
  const [editorType, setEditorType] = React.useState<0 | 1 | 2>(0); // 0 新增一级目录  1 编辑目录 2 新增子集目录
  const [delData, setDelData] = React.useState<
    IDirectoryProps[] | IDirectoryProps
  >();
  const [editorData, setEditorData] = React.useState<IDirectoryProps>();
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
        field: 'name',
        headerName: '名称',
        flex: 1,
      },
      {
        field: 'type',
        headerName: '类别',
        flex: 1,
      },
      {
        field: 'can_use',
        headerName: '是否有效',
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams) => {
          return params.value ? '是' : '否';
        },
      },
      {
        field: 'operations',
        headerName: '操作',
        width: 180,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ({ id, row }: GridCellParams) => {
          return (
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={() => {
                  setEditorType(1);
                  setEditorData(row as IDirectoryProps);
                  setRoleEditorOpen(true);
                }}
              >
                修改
              </Button>
              <Button
                onClick={() => {
                  setEditorType(2);
                  setEditorData(row as IDirectoryProps);
                  setRoleEditorOpen(true);
                }}
              >
                添加
              </Button>
              <Button
                onClick={() => {
                  setDelData(row as IDirectoryProps);
                  setBatchDeleteAlertOpen(true);
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
        目录管理
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
            Toolbar: DirectoryGridToolbar,
          }}
          componentsProps={{
            toolbar: {
              isBatchDeleteAvailable: Boolean(selectionModel.length),
              setBatchDeleteAlertOpen: setBatchDeleteAlertOpen,
              setRoleEditorOpen: setRoleEditorOpen,
              setEditorType: setEditorType,
              setDelData: setDelData,
              data: data,
              selectionModel: selectionModel,
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
      <DelDirectoryDialog
        open={batchDeleteAlertOpen}
        setBatchDeleteAlertOpen={setBatchDeleteAlertOpen}
        data={delData as IDirectoryProps[] | IDirectoryProps}
      />
      <EditorDirectoryDialog
        open={roleEditorOpen}
        setRoleEditorOpen={setRoleEditorOpen}
        type={editorType}
        data={editorData as IDirectoryProps}
      />
    </Paper>
  );
}

export default React.memo(AddNewDirectory);
