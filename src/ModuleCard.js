import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    cardstyle: {
        padding: "2px",
        paddingLeft: "5px"
    },
    title: {
        fontSize: "0.8em",

    },
    subtitle: {
        fontSize: "0.6em"
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
        <Card className = {classes.cardstyle}  style = {{backgroundColor: `${props.colorPalette[props.color]}`, color: "black"}}>
            <Grid container direction = "column" alignItems ="flex-start" justify = "flex-start">
                <Typography className = {classes.title} variant = "subtitle2">{props.moduleCode}</Typography>

                <Typography className = {classes.subtitle} variant = "caption">{lessonType(props.lessonType.toLowerCase(), props.classNo)}</Typography>

                <Typography className = {classes.subtitle} variant = "caption">{props.venue}</Typography>

                <Typography className = {classes.subtitle} variant = "caption">{weeks(props.weeks)}</Typography>
            </Grid>
        </Card>
    )
}




export default ModuleCard