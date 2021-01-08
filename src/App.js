import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { Box, Card, Container, makeStyles, Typography } from '@material-ui/core'

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
  const slots = Array.from({length: timeSlotCount}, (v, i) => {
      return {
        start: ((+startTime) + 100 * i).toString().padStart(4, '0'),
        end: ((+startTime) + 100 * (i+1)).toString().padStart(4, '0')
      }
    }
  );

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
      </Container>
    </div>
  );
}

export default App;
