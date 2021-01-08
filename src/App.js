import { Box, Card, Container, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { fetchModule } from './redux/modulesSlice'
import { useSelector, useDispatch } from 'react-redux'
import TitleBar from './TitleBar.js'
import AddMods from './AddMods'
import { generateLessonPlan, dayToIndex } from './timetable'
import ModuleCard from './ModuleCard'
import ModulesView from './ModulesView'

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
    background: 'linear-gradient(90deg,#CCC 50%,transparent 0)',
    // backgroundSize: '13% 13%',
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

  const numberOfSlots = 10;
  const timetableStartTime = '0800';

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

  const lessonSlotsByDay = [[],[],[],[],[],[],[]];
  for (var lessonSlot of lessonPlan) {
    const dayIndex = dayToIndex(lessonSlot.day);
    if (lessonSlotsByDay[dayIndex] === undefined)
      lessonSlotsByDay[dayIndex] = []
    lessonSlotsByDay[dayIndex].push(lessonSlot);
  }
  lessonSlotsByDay.forEach(slots => slots.sort((slot1, slot2) => slot1.startTime - slot2.startTime));

  console.log(lessonSlotsByDay);

  const slotToString = function(classSlot) {
    return classSlot.moduleCode + 'Class' + classSlot.classNo;
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
        {/* <Typography className={classes.appBar} variant="h4" >
          <img src={logo} className={classes.img} />
        </Typography> */}
        <Card className={classes.timetable}>
        {/* <TitleBar /> */}
          <Box display="flex">
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
          {days.map((day, dayIndex) =>
            <Box display="flex">
              <Box className={classes.dayOfWeek}>
                {day}
              </Box>
              <Box display="flex" flex={1} className={classes.row} style={{backgroundSize: `${200/numberOfSlots}% ${200/numberOfSlots}%`}}>
                {
                  
                  lessonSlotsByDay[dayIndex]?.map((slot, slotIndex) => {
                    const leftSlotsEmpty = ((+slot.startTime)-(slotIndex === 0 ? timetableStartTime: +lessonSlotsByDay[dayIndex][slotIndex-1].endTime)) / 100;
                    const marginLeft = leftSlotsEmpty*100/numberOfSlots;
                    return <div style={{width: `${100/numberOfSlots * ((+slot.end)-(+slot.start)) / 100}%`, marginLeft: marginLeft +'%'}}>
                      {`${100/numberOfSlots * ((+slot.end)-(+slot.start)) / 100}%`}
                      {marginLeft}
                      <ModuleCard
                        {...slot}/>
                    </div>
                  }
                    
                    // {
                      
                    // }
                    // timeSlotModules[day] ? timeSlotModules[day][slot.start]?.map(classSlot => {
                    //   return <Box display="block">
                    //     {classSlot.startTime}
                    //     {slotToString(classSlot)}
                    //   </Box>
                    //   }
                    // ) : null

                    // <Box flex='1' className={classes.slot}>
                    //   {
                    //     timeSlotModules[day] ? timeSlotModules[day][slot.start]?.map(classSlot => {
                    //       return <Box display="block">
                    //         {slotToString(classSlot)}
                    //       </Box>
                    //       }
                    //     ) : null
                    //   }
                    // </Box>
                  )
                }
              </Box>
            </Box>
          )}
        </Card>
        <AddMods
          listOfMods={listOfMods}
          onTextChange={onTextChange}
          modules={modules}
        />
        {/* <form onSubmit={submitModule}>
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
        } */} 
        
        <ModulesView
            data = {modules}
            semester = {1}
          />
      </Container>
    </div>
  );
}

export default App;