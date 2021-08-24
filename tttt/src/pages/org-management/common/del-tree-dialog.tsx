/**@jsxImportSource @emotion/react */
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { TreeDataProps } from './get-tree-data-query';

interface DelDialogProps {
  open: boolean;
  handleClose: () => void;
  data: TreeDataProps;
}
function DelTreeItemDialog({
  open,
  handleClose,
  data,
}: DelDialogProps): React.ReactElement {
  const handleClickDel = () => {
    // TODO 删除操作
    console.log(data, '删除的数据');
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">确定删除吗?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          删除的数据可能无法还原，仍然要继续吗？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          放弃
        </Button>
        <Button onClick={handleClickDel} color="primary" autoFocus>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DelTreeItemDialog;
