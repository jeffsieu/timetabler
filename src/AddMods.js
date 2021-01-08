import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { fetchModule, deleteModule } from './redux/modulesSlice'
import { InputBase, Input } from '@material-ui/core';


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
  const moduleCodes = props.modules.map(module => module.moduleCode);
  
  const allModules = useSelector((state) => state.allModules.allModules)



  const submitModule = (input) => {
    dispatch(fetchModule(input.toLocaleUpperCase()));
    setInputValue('');
    setSelectValue('');
  }
  const newMap = allModules.filter( modules => modules.moduleCode.includes(inputValue.toLocaleUpperCase()) && inputValue.length > 1).map( modules => modules.moduleCode)

 
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
          options={newMap}
          style={{ width: 300 }}
          noOptionsText = {'Enter a valid module code'}
          renderInput={(params) => <TextField {...params} label="Add Module" variant="outlined" />}
        />
        {/* <Input onChange = {e => setInputValue(e.target.value)} value = {inputValue}>Enter a module</Input> */}
      </form>
    </div>    
  );
}