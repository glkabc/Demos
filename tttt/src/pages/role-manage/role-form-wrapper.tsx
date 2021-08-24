/** @jsxImportSource @emotion/react */

import RoleForm from './role-form';
import RoleFormType from './role-form-type';
import useRoleQuery from './use-role-query';

interface Props {
  id?: number;
}

export const roleFormDefaultValue: RoleFormType = {
  role_name: '',
  resource_number: '',
  resource_name: '',
  role_description: '',
  role_status: '1',
};

function RoleFormWrapper({ id }: Props) {
  const { data, isLoading, isError, isIdle, isSuccess } = useRoleQuery(id);

  if (id === undefined) {
    return <RoleForm initialValues={roleFormDefaultValue} />;
  }

  if (isIdle || isLoading) {
    return <div>加载中...</div>;
  }

  if (isError) {
    return <div>加载出错</div>;
  }

  if (isSuccess && data) {
    return <RoleForm initialValues={data} />;
  }

  return null;
}

export default RoleFormWrapper;
