import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  width: {
    margin: '1em 0em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  search: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function AddMods(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const moduleCodes = props.modules.map(module => module.moduleCode);
  
  return (
    <div className={classes.width}>
      {/* <Autocomplete
        value = {inputValue}
        className={classes.search}
        id="modsearch"
        options={props.listOfMods}
        getOptionLabel={(option) => option.moduleCode}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select modules.." variant="outlined" />}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      /> */}

      <Autocomplete
        value={selectValue}
        onChange={(event, newValue) => {
          setSelectValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="mod-search"
        options={props.listOfMods}
        getOptionLabel={(option) => option.moduleCode}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
      />
    </div>    
  );
}