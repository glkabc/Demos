/** @jsxImportSource @emotion/react */
import * as React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  id: number | undefined;
  data?: {
    org_name: string;
    org_role_description: string;
  };
  setSubmitData?: any;
}

function RoleFromWrapper({ id, data, setSubmitData }: Props) {
  const [orgName, setOrgNme] = React.useState(
    id !== undefined ? data?.org_name : '',
  );
  const [orgRoleDescription, setOrgRoleDescription] = React.useState(
    id !== undefined ? data?.org_role_description : '',
  );
  const handelChangeOrgName = (e: any) => {
    setOrgNme(e.target.value);
    setSubmitData({
      id: id,
      org_name: e.target.value,
      org_role_description: orgRoleDescription,
    });
  };
  const handleChangeDescription = (e: any) => {
    setOrgRoleDescription(e.target.value);
    setSubmitData({
      id: id,
      org_name: orgName,
      org_role_description: e.target.value,
    });
  };
  return (
    <div>
      <TextField
        value={orgName}
        label="组织名称"
        onChange={handelChangeOrgName}
        fullWidth
      />
      <br />
      <br />
      <TextField
        value={orgRoleDescription}
        label="组织简介"
        onChange={handleChangeDescription}
        fullWidth
        multiline
        rowsMax="10"
      />
    </div>
  );
}

export default RoleFromWrapper;
