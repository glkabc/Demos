/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid, MenuItem } from '@material-ui/core';
import { ISubmitData } from './resource-form-type';

interface IResourceProps {
  handleSubmitData: (data: ISubmitData, type: 0 | 1 | 2) => void;
  editorData: ISubmitData;
  editorType: 0 | 1;
}
const defaultValue: ISubmitData = {
  resource_name: '',
  resource_classify: '',
  resource_code: '',
  resource_statue: 0,
  resource_address: '',
  resource_remark: '',
};

const resource_classify = [
  {
    value: '分类1',
    id: 1,
  },
  {
    value: '分类2',
    id: 2,
  },
  {
    value: '分类3',
    id: 3,
  },
];

function ResourceFrom({
  handleSubmitData,
  editorData,
  editorType,
}: IResourceProps): ReactElement {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: defaultValue,
  });
  React.useEffect(() => {
    if (editorData !== undefined && editorType === 0) {
      setValue('resource_name', editorData.resource_name);
      setValue('resource_classify', editorData.resource_classify);
      setValue('resource_code', editorData.resource_code);
      setValue('resource_statue', editorData.resource_statue);
      setValue('resource_address', editorData.resource_address);
      setValue('resource_remark', editorData.resource_remark);
    } else if (editorData !== undefined && editorType === 1) {
      reset();
    }
  }, [editorData, setValue, editorType, reset]);

  const handleClickClear = (): void => {
    reset();
  };
  const submit = (data: ISubmitData): void => {
    let type: 0 | 1 | 2 = editorType === 0 ? 0 : editorType === 1 ? 1 : 2;
    handleSubmitData(data, type);
  };
  return (
    <div
      css={{
        padding: '40px 60px',
        MaxHeight: 597,
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={5}>
          {editorType === 1 ? (
            <Grid item xs={12} xl={12}>
              <TextField
                label="父级资源名称"
                required
                value={editorData.resource_name}
                disabled={true}
                error={errors.resource_name ? true : false}
                fullWidth
              />
            </Grid>
          ) : null}
          <Grid item xs={6} xl={6}>
            <Controller
              name="resource_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="资源名称"
                  required
                  value={field.value}
                  error={errors.resource_name ? true : false}
                  onChange={field.onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} xl={6}>
            <Controller
              name="resource_classify"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="资源分类"
                  required
                  error={errors.resource_classify ? true : false}
                  select
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                >
                  {resource_classify.map((v) => (
                    <MenuItem key={v.id} value={v.value}>
                      {v.value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={6} xl={6}>
            <Controller
              name="resource_code"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="资源编码"
                  required
                  error={errors.resource_code ? true : false}
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} xl={6}>
            <Controller
              name="resource_statue"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="菜单状态"
                  select
                  required
                  error={errors.resource_statue ? true : false}
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                >
                  <MenuItem value={0}>启用</MenuItem>
                  <MenuItem value={1}>禁用</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} xl={12}>
            <Controller
              name="resource_address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="资源地址"
                  required
                  error={errors.resource_address ? true : false}
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} xl={12}>
            <Controller
              name="resource_remark"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="备注"
                  required
                  error={errors.resource_remark ? true : false}
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                  multiline
                  rowsMax={5}
                />
              )}
            />
          </Grid>
        </Grid>
        <div
          css={{
            position: 'absolute',
            bottom: -20,
            left: '45%',
          }}
        >
          <Button
            type="submit"
            css={{
              color: '#fff',
              backgroundColor: '#1ea5fc',
              '&:hover': {
                backgroundColor: '#1794e5',
              },
            }}
          >
            保存
          </Button>
          <Button
            css={{
              color: '#fff',
              backgroundColor: '#feaa19',
              '&:hover': {
                backgroundColor: '#c7881c',
              },
              marginLeft: 10,
            }}
            onClick={handleClickClear}
          >
            清除
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResourceFrom;
