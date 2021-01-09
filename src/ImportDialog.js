import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { fetchModule } from './redux/modulesSlice'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    float: 'right',
  },
  dialog: {
    minWidth: 'md',
  },
}));

export default function FormDialog(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (input) => {
    setOpen(false);
    const submitModule = (input) => {
      dispatch(fetchModule(input.toLocaleUpperCase()));
    }

    try {
      const url = new URL(input);
      Array.from(url.searchParams.keys()).map(submitModule);   
    } catch (err) {
      props.msg("Invalid URL entered. Check that you copy the shareable URL from NUSmods correctly!");
    }

  };  

  return (
    <div className={classes.root}>
      <Fab color="primary" variant="extended" onClick={handleClickOpen}>
        <AddIcon />
        Import from NUSMods
      </Fab>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle id="title">Import</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Enter NUSmods share URL:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL"
            fullWidth
            onChange={e => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit(url)} color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}