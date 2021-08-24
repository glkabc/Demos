/** @jsxImportSource @emotion/react */

import {
  Drawer,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Button,
  // Divider,
} from '@material-ui/core';
//   import { useTheme } from '@emotion/react';
import UserFormWrapper from './user-form-wrapper';

interface Props {
  id?: number;
  userEditorOpen: boolean;
  setUserEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditorUser({ id, userEditorOpen, setUserEditorOpen }: Props) {
  // const theme = useTheme();
  const title = id ? '修改人员' : '添加人员';
  return (
    <Drawer anchor="right" open={userEditorOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        css={{
          width: `500px`,
        }}
      >
        {userEditorOpen ? (
          <UserFormWrapper id={id} setUserEditorOpen={setUserEditorOpen} />
        ) : null}
      </DialogContent>
      <DialogActions
        css={{
          justifyContent: 'flex-start',
        }}
      ></DialogActions>
    </Drawer>
  );
}

export default EditorUser;
