import { Box, Card, CardContent, Container, makeStyles, TextField, FormControl, InputLabel, MenuItem, Select, Grid } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { fetchModule } from './redux/modulesSlice'
import { deleteCustomModule, deleteAllCustomModules, addCustomModule, updateCustomModules } from './redux/customModules'
import { useSelector, useDispatch } from 'react-redux'
import TitleBar from './TitleBar.js'
import AddMods from './AddMods'
import { generateLessonPlan, dayToIndex } from './timetable'
import ModuleCard from './ModuleCard'
import ModulesView from './ModulesView'
import { Rnd } from 'react-rnd';
import { border } from '@material-ui/system'

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0.75em 0.5em'
  },
  timetable: {
    borderColor: theme.palette.divider,
  },
  daySlot: {
    minWidth: '56px',
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.default,
    borderTop: '1px solid',
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    borderTopColor: theme.palette.divider
  },
  topLeft: {
    minWidth: '56px',
    minHeight: '50px',
    background: theme.palette.background.default
  },
  row: {
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
    minHeight: '48px',
    background: `linear-gradient(90deg,${theme.palette.background.default} 50%,${theme.palette.background.other} 0)`,
    // backgroundSize: '13% 13%',
  },
  slot:
  {
    borderColor: 'grey',
    borderLeft: '1px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end ',
    borderColor: 'transparent',
    paddingBottom: '5px',
    background: theme.palette.background.default
  },
  appBar: {
    backgroundColor: '#ececec',
    borderRadius: '8px'
  },
}));


const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

const backgroundStyle = {
  background: 'rgb(0,0,0,0)'
}

function App() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const classes = useStyles();
  const startTime = '0800';
  const endTime = '1800';
  const [semester, setSemester] = useState('1')
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
  const customModules = useSelector((state) => state.customModules.customModules);

  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const submitModule = (input) => {
    dispatch(fetchModule(input));
    setInputValue('');
    setSelectValue('');
  }

  // Get all mods
  const listOfMods = useSelector(state => state.allModules.allModules);
  const lessonPlan = generateLessonPlan(modules, customModules, semester);

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

  const lessonSlotsByDay = [[], [], [], [], [], [], []];
  for (var lessonSlot of lessonPlan) {
    const dayIndex = dayToIndex(lessonSlot.day);
    if (lessonSlotsByDay[dayIndex] === undefined)
      lessonSlotsByDay[dayIndex] = []
    lessonSlotsByDay[dayIndex].push(lessonSlot);
  }
  lessonSlotsByDay.forEach(slots => slots.sort((slot1, slot2) => slot1.startTime - slot2.startTime));

  // color palette
  const colorPalette = ['#fa7a7a', '#fabc7a', '#d6fa7a', '#94e87d', '#7de8aa', '#7ddae8', '#7da1e8', '#bf7de8', '#e87dc3']

  const componentRef = useRef();
  const { width, height } = useContainerDimensions(componentRef)

  function getOffsetLeft(component) {
    return component.offsetLeft + (component.offsetParent ? getOffsetLeft(component.offsetParent) : 0);
  }

  function getOffsetTop(component) {
    return component.offsetTop + (component.offsetParent ? getOffsetTop(component.offsetParent) : 0);
  }
  const offsetLeft = componentRef.current?.getBoundingClientRect()?.x ?? 0;
  const offsetTop = componentRef.current?.getBoundingClientRect()?.height  ?? 0;

  const slotWidth = width / timeSlotCount;
  const slotHeight = height;

  console.log(offsetLeft);
  console.log(offsetTop);

  console.log(componentRef.current?.offsetTop);
  console.log(componentRef.current?.getBoundingClientRect())

  function onRowClick(dayIndex) {
    return function (event) {
      console.log(dayIndex);
      const x = event.clientX;
      const slot = Math.floor((x - offsetLeft) / slotWidth);
      dispatch(addCustomModule({
        startTime: slotToTime(slot),
        endTime: slotToTime(slot + 1),
        dayIndex: dayIndex,
      }));
    }
  }

  function slotToTime(slot) {
    return (slot * 100 + (+timetableStartTime)).toString().padStart(4, '0');
  }

  function timeToSlot(time) {
    return (+time - (+timetableStartTime)) / 100;
  }

  function onCustomModuleDragStop(customModule) {
    return function (event, data) {
      console.log((data.x));
      const transformX = data.node.style.transform.split('(')[1].split(',')[0];
      const transformY = data.node.style.transform.split('(')[1].split(',')[1];
      const dayIndex = Math.floor(transformY.substring(0, transformX.length - 2) / slotHeight);
      const slot = Math.floor(transformX.substring(0, transformX.length - 2) / slotWidth);
      if (slot !== timeToSlot(customModule.startTime) || dayIndex !== customModule.dayIndex) {
        dispatch(updateCustomModules({
          id: customModule.id,
          startTime: customModule.startTime,
          endTime: customModule.endTime,
          dayIndex: customModule.dayIndex,
        }));
      }
      return true;
    };
  }

  function onCustomModuleResizeStop(customModule) {
    return function (e, dir, refToElement, delta, position) {
      const slotsExpanded = Math.round(delta.width / slotWidth);
      if (slotsExpanded !== 0) {
        dispatch(updateCustomModules({
          id: customModule.id,
          startTime: customModule.startTime,
          dayIndex: customModule.dayIndex,
          endTime: slotToTime(timeToSlot(customModule.endTime) + slotsExpanded),

        }));
      }
      return true;
    };
  }

  return (
    <div className="App">
      <Container>
        <TitleBar />
        <Grid container justify="flex-end">
          <FormControl className={classes.formControl} >
            <InputLabel>Semester</InputLabel>
            <Select
              value={semester}
              onChange={e => setSemester(e.target.value)}
              label="Semester"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Box>
          {customModules.map(customModule =>
            <Rnd
              onDragStop={onCustomModuleDragStop(customModule)}
              onResizeStop={onCustomModuleResizeStop(customModule)}
              default={{
                x: offsetLeft + (slotWidth * timeToSlot(customModule.startTime)),
                y: offsetTop + (slotHeight * customModule.dayIndex),
                width: slotWidth * (timeToSlot(customModule.endTime) - timeToSlot(customModule.startTime)),
              }}
              size={{
                width: slotWidth * (timeToSlot(customModule.endTime) - timeToSlot(customModule.startTime)),
              }}
              position={{
                x: offsetLeft + (slotWidth * timeToSlot(customModule.startTime)),
                y: offsetTop + (slotHeight * customModule.dayIndex),
              }}
              enableResizing={{
                bottom: false,
                bottomLeft: false,
                bottomRight: false,
                left: true,
                right: true,
                top: false,
                topLeft: false,
                topRight: false,

              }}
              dragGrid={[slotWidth, slotHeight]}
              resizeGrid={[slotWidth, 1]}
              bounds='window'
            >
              <div style={{ margin: 0, height: '48px' }}>
                <Card style={{ minHeight: '48px' }}>
                  Free slot
                  {customModule.dayIndex}
              </Card>
              </div>
            </Rnd>)}
        </Box>
        <Card className={classes.timetable}>
          <Box display="flex">
            <Box className={classes.topLeft}>
            </Box>
            {
              slots.map(slot =>
                <Box flex='1' className={classes.slot} alignItems="center" >
                  {slot.start}
                </Box>
              )
            }
          </Box>
          {days.map((day, dayIndex) =>
            <Box display="flex">
              <Box textAlign="center" fontWeight='bold' className={classes.daySlot}>
                {day}
              </Box>
              <Box onClick={onRowClick(dayIndex)} ref={dayIndex === 0 ? componentRef : null} display="flex" flex={1} className={classes.row} style={{ backgroundSize: `${200 / numberOfSlots}% ${200 / numberOfSlots}%` }}>
                {
                  lessonSlotsByDay[dayIndex]?.map((slot, slotIndex) => {
                    const leftSlotsEmpty = ((+slot.startTime) - (slotIndex === 0 ? timetableStartTime : +lessonSlotsByDay[dayIndex][slotIndex - 1].endTime)) / 100;
                    const marginLeft = leftSlotsEmpty * 100 / numberOfSlots;
                    return <div style={{ width: `${100 / numberOfSlots * ((+slot.endTime) - (+slot.startTime)) / 100}%`, marginLeft: marginLeft + '%' }}>
                      { }
                      <ModuleCard
                        {...slot}
                        colorPalette={colorPalette} />

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
          modules={modules}

        />

        <ModulesView
          data={modules}
          semester={semester} // 0 for sem 1 1 for sem 2
          colorPalette={colorPalette}
        />
        {offsetLeft}
        {offsetTop}
      </Container>
    </div>
  );
}

export default App;