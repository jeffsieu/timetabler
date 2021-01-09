import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    padding: "4px 8px",
    borderRadius: '4px',
  },
  cardStyleFixed: {
    padding: "4px 8px",
    borderRadius: '0px',
  },
  title: {
    // fontSize: "0.8em",

  },
  subtitle: {
    // fontSize: "0.6em"
  }
}))


function ModuleCard(props) {
  const classes = useStyles();

  const lessonType = (lesson, className) => {
    switch (lesson) {
      case ("tutorial"):
        return `TUT[${className}]`
      case ("lecture"):
        return `LEC[${className}]`
      case ("recitation"):
        return `REC[${className}]`
      case ("laboratory"):
        return `LAB[${className}]`
      case ("sectional"):
        return `SEC[${className}]`
    }
  }
  const weeks = (weekArray) => {
    const start = weekArray[0]
    const end = weekArray[weekArray.length - 1]
    const difference = end - start
    if (difference === weekArray.length - 1) {
      return `Weeks ${start}-${end}`
    } else {
      let output = "Week "
      for (let x = 0; x < weekArray.length; x++) {
        output += weekArray[x] + " "
      }
      return output;
    }
  }

  return (
    <Card className={props.fixed ? classes.cardStyleFixed : classes.cardStyle} style={{ backgroundColor: `${props.color}`, color: "black", minHeight: '48px'}}>
      <Grid container direction="column" alignItems="flex-start" justify="flex-start">
        {
          props.dayIndex !== undefined ? 
          <Typography className={classes.title} variant="subtitle1">Free Time</Typography> :
            <Grid container direction="column" alignItems="flex-start" justify="flex-start">
              <Typography className={classes.title} variant="subtitle1">{props.moduleCode}</Typography>

              <Typography className={classes.subtitle} variant="caption">{lessonType(props.lessonType.toLowerCase(), props.classNo)}</Typography>
              <Typography className={classes.subtitle} variant="caption">{props.venue}</Typography>
              <Typography className={classes.subtitle} variant="caption">{weeks(props.weeks)}</Typography>
            </Grid>

        }

      </Grid>
    </Card>
  )
}




export default ModuleCard