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
}

function IndividualDeleteAlert({ open, setIndividualDeleteAlertOpen }: Props) {
  const handleClose = () => {
    setIndividualDeleteAlertOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">确定该角色吗?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          删除的角色可能无法还原，仍然要继续吗？
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

export default IndividualDeleteAlert;
