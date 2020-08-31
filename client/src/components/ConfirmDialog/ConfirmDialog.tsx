import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogProps {
  title: string;
  open: boolean;
  setOpen: Function;
  onConfirm: Function;
}

const ConfirmDialog: FC<DialogProps> = ({
  title,
  children,
  open,
  setOpen,
  onConfirm,
}) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        style: {
          backgroundColor: '#15202B',
        },
      }}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
