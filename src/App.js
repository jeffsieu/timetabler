import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { Box, Card, Container, FormControl, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { fetchModule, deleteModule, re} from './redux/modulesSlice'
import selectAllModules from './redux/modulesSlice'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles({
  row: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    borderRadius: 3,
    // color: 'white',
    height: 48,
    borderTop: '1px solid',
    borderColor: 'black',
    // padding: '0 30px',
  },
  dayOfWeek: {
    // boxShadow: '10px 0 5px -2px #888',
    width: 100,
  },
  slot:
  {
    borderLeft: '1px solid',
    borderColor: 'black',
  }
});

function App() {


  const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const classes = useStyles();

  const startTime = '0800';
  const endTime = '1800';

  const timeSlotCount = ((+endTime) - (+startTime)) / 100;
  const slots = Array.from({ length: timeSlotCount }, (v, i) => {
    return {
      start: ((+startTime) + 100 * i).toString().padStart(4, '0'),
      end: ((+startTime) + 100 * (i + 1)).toString().padStart(4, '0')
    }
  }
  );

  const dispatch = useDispatch()

  const modules = useSelector((state) => state.modules.modules)

  const [input, setInput] = useState('')
  const status = useSelector((state) => state.modules.status)
  const onTextChange = e => setInput(e.target.value.toUpperCase())

  const submitModule = (event) => {
    event.preventDefault();
    dispatch(fetchModule(input))
  }

  console.log(modules);

  if (status === 'succeeded' && typeof test !== 'undefined') {
    console.log(test);
    // modules = test.map(item => {
    //   console.log('test')
    //   // return (
    //   //   <div key={item.moduleCode}>
    //   //     <p>{item.moduleCode}</p>
    //   //     <button value={item.moduleCode} onClick={deleteModule} />
    //   //   </div>
    //   // )
    // })
  }


  return (
    <div className="App">
      <Container>
        <Typography variant="h4">
          timetabler
        </Typography>
        <Card>
          <Box display="flex" className={classes.row}>
            <Box width={100}>
            </Box>

            {
              slots.map(slot =>
                <Box flex='1' className={classes.slot} borderColor="black">
                  {slot.start}
                </Box>
              )
            }
          </Box>
          {weeks.map(week =>
            <Box display="flex" className={classes.row}>
              <Box className={classes.dayOfWeek}>
                {week}
              </Box>

              {
                slots.map(slot =>
                  <Box flex='1' className={classes.slot} borderColor="black">
                    {slot.start}
                  </Box>
                )
              }
            </Box>
          )}
        </Card>
        <form onSubmit={submitModule}>
          <TextField onChange={onTextChange} inputProps={{style: {textTransform: 'uppercase'}}}>

          </TextField>
        </form>
        {modules.length}
        {
          modules.map(module => 
            <Box>
              {module.moduleCode}
            </Box>
          )
        }
      </Container>
    </div>
  );
}

export default App;
