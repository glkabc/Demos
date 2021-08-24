/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Drawer,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@material-ui/core';
import { useTheme } from '@emotion/react';
import RoleFormWrapper from './role-form-wrapper';

interface Props {
  id?: number;
  roleEditorOpen: boolean;
  setRoleEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: {
    org_name: string;
    org_role_description: string;
  };
}

function UpdateRolesData({
  id,
  roleEditorOpen,
  setRoleEditorOpen,
  data,
}: Props) {
  const theme = useTheme();
  const title = id ? '编辑组织' : '新增组织';
  const [submitData, setSubmitData] = React.useState({
    id: id,
    org_name: '',
    org_role_description: '',
  });
  const handelClickSubmit = () => {
    console.log(submitData, '数据提交了');
    setRoleEditorOpen(false);
  };
  return (
    <Drawer
      anchor="right"
      open={roleEditorOpen}
      onClose={() => setRoleEditorOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider />
      <DialogContent
        css={{
          width: `calc(45vw - ${theme.dashboardDrawerWidth}px)`,
        }}
      >
        {roleEditorOpen ? (
          <RoleFormWrapper id={id} data={data} setSubmitData={setSubmitData} />
        ) : null}
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
          onClick={handelClickSubmit}
        >
          确认
        </Button>
        <Button onClick={() => setRoleEditorOpen(false)}>取消</Button>
      </DialogActions>
    </Drawer>
  );
}

export default UpdateRolesData;
