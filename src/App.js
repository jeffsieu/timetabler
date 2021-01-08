import { Box, Card, Container, FormControl, makeStyles, TextField, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule';
import React, { useState } from 'react'
import { fetchModule, deleteModule, re } from './redux/modulesSlice'
import selectAllModules from './redux/modulesSlice'
import { useSelector, useDispatch } from 'react-redux'
import AddMods from './AddMods'
import { border, borderRadius } from '@material-ui/system'
import logo from './title.png'
import { generateLessonPlan, dayToIndex } from './timetable'

const useStyles = makeStyles({
  title: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0.75em 0.5em'
  },
  timetable: {
    borderColor: 'grey'
  },
  row: {
    borderRadius: 3,
    borderTop: '1px solid',
    borderColor: 'grey',
    minHeight: '48px',
  },
  dayOfWeek: {
    width: 100,
  },
  slot:
  {
    borderColor: 'grey',
    borderLeft: '1px solid',
  },
  appBar: {
    backgroundColor: '#ececec',
    borderRadius: '8px'
  },
  img: {
    padding: '8px',
    marginTop: '5px',
    width: '30%',
    height: 'auto',
  }
});

function App() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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

  // Get all mods
  const listOfMods = useSelector(state => state.allModules.allModules);
  const lessonPlan = generateLessonPlan(modules, 1);

  console.log("Generated lessons:");
  console.log(lessonPlan);

  const timeSlotModules = [];
  
  for (let lesson of lessonPlan) {
    const day = dayToIndex(lesson.day);
    if (timeSlotModules[day] === undefined) {
      timeSlotModules[day] = {};
    }

    if (timeSlotModules[day][lesson.startTime] === undefined) {
      timeSlotModules[day][lesson.startTime] = [];
    }
    timeSlotModules[day][lesson.startTime].push(lesson); 
  }


  const lessonSlots = modules.map(module => module.semesterData.map(data => data.timetable));
  console.log(lessonSlots);

  const slotToString = function(classSlot) {
    return classSlot.moduleCode + 'Class' + classSlot.classNo;
  }

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
        <Typography className={classes.appBar} variant="h4" >
          <img src={logo} className={classes.img} />
        </Typography>
        <Card className={classes.timetable}>
          <Box display="flex" className={classes.row}>
            <Box width={100}>
            </Box>
            {
              slots.map(slot =>
                <Box flex='1' className={classes.slot}>
                  {slot.start}
                </Box>
              )
            }
          </Box>
          {days.map(day =>
            <Box display="flex" className={classes.row}>
              <Box className={classes.dayOfWeek}>
                {day}
              </Box>
              {
                slots.map(slot =>
                  <Box flex='1' className={classes.slot}>
                    {
                      timeSlotModules[day] ? timeSlotModules[day][slot.start]?.map(classSlot => {
                        return <Box display="block">
                          {slotToString(classSlot)}
                        </Box>
                        }
                      ) : null
                    }
                  </Box>
                )
              }
            </Box>
          )}
        </Card>
        <AddMods
          listOfMods={listOfMods}
          onTextChange={onTextChange}
          modules={modules}
        />
        <form onSubmit={submitModule}>
          <TextField onChange={onTextChange} inputProps={{ style: { textTransform: 'uppercase' } }}>

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