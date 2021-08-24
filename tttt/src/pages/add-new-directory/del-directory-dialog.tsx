/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { IDirectoryProps } from './use-new-directory-query';

interface IDelProps {
  open: boolean;
  setBatchDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IDirectoryProps[] | IDirectoryProps;
}

function DelDirectoryDialog({
  open,
  setBatchDeleteAlertOpen,
  data,
}: IDelProps): ReactElement {
  console.log(data, '传入的需要删除的数据');
  const handleClose = (): void => {
    setBatchDeleteAlertOpen(false);
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
        <Button onClick={handleClose} color="primary" autoFocus>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(DelDirectoryDialog);
