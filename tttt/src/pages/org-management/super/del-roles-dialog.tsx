/** @jsxImportSource @emotion/react */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface Props {
  open: boolean;
  setIndividualDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: 1 | 2; // 1 单个删除  2 批量删除
}

function DelRolesDialog({ open, setIndividualDeleteAlertOpen, type }: Props) {
  const handleClose = () => {
    setIndividualDeleteAlertOpen(false);
  };
  const handleClickDel = (): void => {
    if (type === 1) {
      console.log('删除的数据');
    } else {
      console.log('批量删除');
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">确定删除已选择的组织吗?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          删除的组织可能无法还原，仍然要继续吗？
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

export default DelRolesDialog;
