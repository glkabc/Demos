/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Drawer,
  DialogActions,
  DialogTitle,
  Divider,
  DialogContent,
  Button,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { useTheme } from '@emotion/react';
import { IDirectoryProps } from './use-new-directory-query';
import { Controller, useForm } from 'react-hook-form';
// import Autocomplete from '@material-ui/lab/Autocomplete'
import NewDirectoryTree from './new-directory-tree';

interface EditorProps {
  open: boolean;
  setRoleEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: 0 | 1 | 2; // 0 新增一级目录  1 编辑目录 2 新增子集目录;
  data: IDirectoryProps;
}
const typeList = [
  {
    value: '1',
    label: '类别1',
  },
  {
    value: '2',
    label: '类别2',
  },
  {
    value: '3',
    label: '类别3',
  },
  {
    value: '4',
    label: '类别4',
  },
];
const canUseList = [
  {
    value: '0',
    label: '是',
  },
  {
    value: '1',
    label: '否',
  },
];
function EditorDirectoryDialog({
  open,
  setRoleEditorOpen,
  type,
  data,
}: EditorProps): React.ReactElement {
  // console.log(type, data, '传进来的需要编辑的数据')
  const theme = useTheme();
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      type: '',
      can_use: '',
    },
  });
  React.useEffect(() => {
    if (type === 1) {
      setValue('name', data.name);
      setValue('can_use', data.can_use ? '0' : '1');
    }
  }, [data, setValue, type]);

  const handelClickSubmit = (data: any): void => {
    console.log(data, '修改或新增的信息');
  };
  const handleClickClose = (): void => {
    reset();
    setRoleEditorOpen(false);
  };
  return (
    <Drawer anchor="right" open={open} onClose={handleClickClose}>
      <DialogTitle id="alert-dialog-title">
        {type === 0 ? '新增一级目录' : type === 1 ? '编辑目录' : '新增子目录'}
      </DialogTitle>
      <Divider />
      <DialogContent
        css={{
          width: `calc(50vw - ${theme.dashboardDrawerWidth}px)`,
        }}
      >
        {type === 2 ? (
          <TextField
            label="父级名称"
            value={data.name}
            disabled={true}
            fullWidth
          />
        ) : null}
        <form>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="名称"
                value={field.value}
                onChange={field.onChange}
                css={{ margin: '10px 0' }}
                fullWidth
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                label="类别"
                select
                value={field.value}
                onChange={field.onChange}
                css={{ margin: '10px 0' }}
                fullWidth
              >
                {typeList.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    {v.label}
                  </MenuItem>
                ))}
              </TextField>
              // <Autocomplete
              //   value={field.value}
              //   options={typeList as IType[]}
              //   getOptionLabel={(option) => option.label}
              //   onChange={(_, v) => field.onChange(v)}
              //   getOptionSelected={(o, v) => {
              //     if (v === {} as IType) {
              //       return v === o
              //     } else {
              //       return v === o
              //     }
              //   }}
              //   renderInput={(params) => {
              //     return (
              //       <TextField
              //         {...params}
              //         label="类别"
              //         margin="dense"
              //         css={{
              //           width: 400
              //         }}
              //       />
              //     );
              //   }}
              // />
            )}
          />
          <Controller
            name="can_use"
            control={control}
            render={({ field }) => (
              <TextField
                label="是否有效"
                select
                value={field.value}
                onChange={field.onChange}
                css={{ margin: '10px 0' }}
                fullWidth
              >
                {canUseList.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    {v.label}
                  </MenuItem>
                ))}
              </TextField>
              // <Autocomplete
              //   value={field.value}
              //   options={canUseList as ICanUse[]}
              //   getOptionLabel={(option) => option.label}
              //   onChange={(_, v) => field.onChange(v)}
              //   renderInput={(params) => {
              //     return (
              //       <TextField
              //         {...params}
              //         label="类别"
              //         margin="dense"
              //         css={{
              //           width: 400
              //         }}
              //       />
              //     );
              //   }}
              // />
            )}
          />
        </form>
        <NewDirectoryTree type={type} />
      </DialogContent>
      <Divider />
      <DialogActions
        css={{
          justifyContent: 'flex-start',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          autoFocus
          onClick={handleSubmit(handelClickSubmit)}
        >
          确认
        </Button>
        <Button onClick={handleClickClose}>取消</Button>
      </DialogActions>
    </Drawer>
  );
}

export default EditorDirectoryDialog;
