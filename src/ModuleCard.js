import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( (theme) => ({
    cardstyle: {
        padding: "10px"
    }
}))


function ModuleCard (props) {
    const classes = useStyles();

    const lessonType = (lesson, className) => {
        switch(lesson) {
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
            for (let x = 0; x < weekArray.length; x ++ ){
                output += weekArray[x] + " "
            }
            return output;
        }
    }
    
    return (
        <Card style = {{maxWidth: "100px"}} className = {classes.cardstyle}>
            <Grid container direction = "column" alignItems ="flex-start">
                <Grid item>
                    <Typography variant = "subtitle2">{props.moduleCode}</Typography>
                </Grid> 
                <Grid item>
                    <Typography variant = "body2">{lessonType(props.lesson.toLowerCase(), props.className)}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant = "body2">{props.venue}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant = "body2">{weeks(props.weeks)}</Typography>
                </Grid>
            </Grid>
        </Card>
    )
}




export default ModuleCard