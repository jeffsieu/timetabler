import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { fetchModule, deleteModule } from './redux/modulesSlice'
import { InputBase } from '@material-ui/core';


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

  const dispatch = useDispatch();
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const allModules = useSelector((state) => state.allModules.allModules)

  const submitModule = (input) => {
    dispatch(fetchModule(input.toLocaleUpperCase()));
    setInputValue('');
    setSelectValue('');
  }
 
  return (
    <div className={classes.width}>
      <form onSubmit = {(e)=> {
        e.preventDefault();
        submitModule(inputValue)
      }}>
        <Autocomplete
          value={selectValue}
          onChange={(event, newValue) => {
            setSelectValue(newValue);
            console.log(newValue);
            if (newValue !== null) {
              submitModule(newValue);
            } 
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="mod-search"
          options={allModules.map( modules => modules.moduleCode)}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Add Module" variant="outlined" />}
        />
      </form>
    </div>    
  );
}