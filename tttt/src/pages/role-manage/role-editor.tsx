/** @jsxImportSource @emotion/react */

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
}

function RoleEditor({ id, roleEditorOpen, setRoleEditorOpen }: Props) {
  const theme = useTheme();
  const title = id ? '编辑角色' : '新增角色';
  return (
    <Drawer anchor="right" open={roleEditorOpen}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider />
      <DialogContent
        css={{
          width: `calc(100vw - ${theme.dashboardDrawerWidth}px)`,
        }}
      >
        {roleEditorOpen ? <RoleFormWrapper id={id} /> : null}
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
          onClick={() => setRoleEditorOpen(false)}
        >
          确认
        </Button>
        <Button onClick={() => setRoleEditorOpen(false)}>取消</Button>
      </DialogActions>
    </Drawer>
  );
}

export default RoleEditor;
