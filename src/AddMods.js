import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  width: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  search: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function AddMods() {
  const classes = useStyles();
  
  return (
    <div className={classes.width}>
      <Autocomplete
        className={classes.search}
        id="combo-box-demo"
        options={ listOfMods }
        getOptionLabel={(option) => option.code}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
    </div>    
  );
}

const listOfMods = [
  { code: "MA1521" },
  { code: "MA1101R" },
]