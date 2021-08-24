/** @jsxImportSource @emotion/react */
import {
  TextField,
  InputAdornment,
  Tooltip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdHelpOutline } from 'react-icons/md';
import { useTheme } from '@emotion/react';

import RoleFormType from './role-form-type';
interface Props {
  initialValues: RoleFormType;
}

const schema = yup.object().shape({
  role_name: yup.string().required(),
  resource_number: yup.string().required(),
  resource_name: yup.string().required(),
  role_description: yup.string().required(),
  role_status: yup.boolean().required(),
});

function RoleForm({ initialValues }: Props) {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<RoleFormType>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<RoleFormType> = (data) => {
    console.log({ data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      css={{
        width: 300,
      }}
    >
      <Controller
        name="role_name"
        control={control}
        render={({ field }) => (
          <TextField
            autoFocus
            id="role_name"
            label="角色名称"
            fullWidth
            margin="dense"
            InputProps={{
              endAdornment: (
                <Tooltip title="角色名称最多二十个字" placement="right" arrow>
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
        name="role_description"
        control={control}
        render={({ field }) => (
          <TextField
            label="角色描述"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="角色描述最多二百五十个字"
                  placement="right"
                  arrow
                >
                  <InputAdornment
                    position="end"
                    css={{
                      cursor: 'pointer',
                      alignSelf: 'stretch',
                      alignItems: 'flex-start',
                    }}
                  >
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
        name="role_status"
        control={control}
        render={({ field }) => (
          <FormControl
            component="fieldset"
            css={{ margin: theme.spacing(1, 0) }}
          >
            <FormLabel component="legend">角色状态</FormLabel>
            <RadioGroup
              aria-label="gender"
              {...field}
              css={{ flexDirection: 'row' }}
            >
              <FormControlLabel value="1" control={<Radio />} label="启用" />
              <FormControlLabel value="0" control={<Radio />} label="禁用" />
            </RadioGroup>
          </FormControl>
        )}
      />
    </form>
  );
}

export default RoleForm;
