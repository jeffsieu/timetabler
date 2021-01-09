import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar'

export default function Alerts(props) {
  const [open, setOpen] = useState(props.messages);
  console.log(props.messages ? "empty" : "non-empty")

  const handleClose = () => {
    setOpen(false)
    props.clearErrorMessage();
  }
  
  return (
    <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {props.messages}
          </Alert>
        </Snackbar>
    </div>
  );
}