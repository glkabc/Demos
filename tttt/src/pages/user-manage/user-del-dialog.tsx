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
  userId: number | undefined;
  setDelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserDelDialog({ open, setDelOpen, userId }: Props) {
  const handleClose = () => {
    setDelOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>确定删除该人员吗</DialogTitle>
      <DialogContent>
        <DialogContentText>
          删除的人员可能无法复原，仍确认删除吗
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

export default UserDelDialog;
