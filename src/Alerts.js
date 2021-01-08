import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Alert } from '@material-ui/lab';

export default function Alerts(props) {
  const [open, setOpen] = useState(props.messages);
  console.log(props.messages);

  return (
    <div>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.messages}
        </Alert>
      </Collapse>
    </div>
  );
}