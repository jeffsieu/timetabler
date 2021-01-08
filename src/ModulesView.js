import React from 'react'
import { Container, Grid, Divider, IconButton, Typography } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import { format } from 'date-fns'





function ModulesView(props) {
    
    const modules = props.data.map (item => {
        console.log(item.semesterData[props.semester].examdate)
        const date = (data) => {
            if (typeof data.semesterData[props.semester] === undefined) {
                return "Not offered in Semester"
            }
            else if (typeof data.semesterData[props.semester].examdate !== undefined){
                return data.semesterData[props.semester].examdate
            } else {
                return "No Exam"
            }
        }
        return (
            <Grid item key = {item.moduleCode}>
                <Grid container direction = "row">
                    <Grid container diretion = "column" alignItems = "center">
                        <Typography variant = "h6" >{item.moduleCode} {item.title}</Typography>
                        <Typography variant = "subtitle2">{date(item)} - {item.moduleCredit}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton><Clear/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    })
    
    return (
        <Container>
            <Grid container direction = "row" justify = "flex-start" alignItems = "center">
                {modules}
                <Grid item>
                </Grid>
            </Grid>
        </Container>
    )
}


export default ModulesView