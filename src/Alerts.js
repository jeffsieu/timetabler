import React, { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar'

export default function Alerts(props) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {  
    setOpen(false);
    props.clearMessage();      
  }
  
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          <AlertTitle><strong>{props.message.title}</strong></AlertTitle>
          {props.message.body}
        </Alert>
      </Snackbar>
    </div>
  );
}