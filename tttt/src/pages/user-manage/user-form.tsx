/** @jsxImportSource @emotion/react */
import { TextField, Tooltip, InputAdornment, Button } from '@material-ui/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { MdHelpOutline } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserFormType from './user-form-type';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  defaltValues: UserFormType;
  setUserEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CountryType {
  id: number;
  lable: string;
}
interface StatusType {
  status: number | undefined;
  lable: string;
}
const schema = yup.object().shape({
  user_name: yup.string().required(),
  user_id: yup.string().required(),
  user_mail: yup.string().required(),
  user_phone: yup.string().required(),
  user_structuer: yup.string().required(),
});
const structureData = [
  {
    id: 10,
    lable: '清华',
  },
  {
    id: 20,
    lable: 'xxxx',
  },
  {
    id: 30,
    lable: 'gggg',
  },
  {
    id: 40,
    lable: '5555',
  },
  {
    id: 50,
    lable: 'ccccc',
  },
  {
    id: 60,
    lable: 'fffff',
  },
];
const userTypes: CountryType[] = [
  {
    id: 1,
    lable: '角色1',
  },
  {
    id: 2,
    lable: '角色2',
  },
  {
    id: 3,
    lable: '角色3',
  },
  {
    id: 4,
    lable: '角色4',
  },
  {
    id: 5,
    lable: '角色5',
  },
  {
    id: 6,
    lable: '角色6',
  },
];
const userStatus: StatusType[] = [
  {
    status: 1,
    lable: '启用',
  },
  {
    status: undefined,
    lable: '禁用',
  },
];
function UserFrom({ defaltValues, setUserEditorOpen }: Props) {
  const { control, handleSubmit } = useForm<UserFormType>({
    resolver: yupResolver(schema),
    defaultValues: defaltValues,
  });
  const onSubmit: SubmitHandler<UserFormType> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="user_name"
        render={({ field }) => (
          <TextField
            autoFocus
            id="user_name"
            label="人员名称"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Tooltip title="人员名称最多二十个字" placement="right" arrow>
                  <InputAdornment position="end" css={{ cursor: 'pointer' }}>
                    <MdHelpOutline />
                  </InputAdornment>
                </Tooltip>
              ),
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="user_id"
        render={({ field }) => (
          <TextField
            autoFocus
            id="user_id"
            label="账号"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Tooltip title="账号不能为空" placement="right" arrow>
                  <InputAdornment position="end" css={{ cursor: 'pointer' }}>
                    <MdHelpOutline />
                  </InputAdornment>
                </Tooltip>
              ),
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="user_mail"
        render={({ field }) => (
          <TextField
            autoFocus
            id="user_mail"
            label="邮箱"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Tooltip title="邮箱不能为空" placement="right" arrow>
                  <InputAdornment position="end" css={{ cursor: 'pointer' }}>
                    <MdHelpOutline />
                  </InputAdornment>
                </Tooltip>
              ),
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="user_phone"
        render={({ field }) => (
          <TextField
            autoFocus
            id="user_phone"
            label="手机号"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Tooltip title="手机号不能为空" placement="right" arrow>
                  <InputAdornment position="end" css={{ cursor: 'pointer' }}>
                    <MdHelpOutline />
                  </InputAdornment>
                </Tooltip>
              ),
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="user_structures"
        render={({ field }) => {
          return (
            <Autocomplete
              freeSolo
              value={field.value}
              //  getOptionSelected={(option, value) => {
              //   return option.id === field.value.id}}
              options={structureData as CountryType[]}
              getOptionLabel={(option) => option.lable}
              onChange={(_, v) => field.onChange(v)}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="组织机构"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                );
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="user_types"
        render={({ field }) => {
          return (
            <Autocomplete
              freeSolo
              value={field.value}
              options={userTypes}
              onChange={(_, v) => field.onChange(v)}
              //  getOptionSelected={(option, value) => {
              //   return option.id === field.value.id}}
              getOptionLabel={(option) => option.lable}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="角色"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                );
              }}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="user_selectStatus"
        render={({ field }) => {
          return (
            <Autocomplete
              freeSolo
              value={field.value}
              options={userStatus}
              onChange={(_, v) => field.onChange(v)}
              //  getOptionSelected={(option, value) => {
              //  return  option.status === field.value.status}}
              getOptionLabel={(option) => option.lable}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="状态"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                );
              }}
            />
          );
        }}
      />
      <div css={{ position: 'absolute', bottom: 10 }}>
        <Button type="submit" variant="contained" color="primary" autoFocus>
          确认
        </Button>
        <Button onClick={() => setUserEditorOpen(false)}>取消</Button>
      </div>
    </form>
  );
}

export default UserFrom;
