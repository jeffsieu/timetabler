import React from 'react'
import { Container, Grid, Divider, IconButton, Typography } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import { format} from 'date-fns'
import { deleteModule } from './redux/modulesSlice'
import { useDispatch } from 'react-redux'



function ModulesView(props) {
    // total MC
    let mc = 0;

    const dispatch = useDispatch()

    const onDeleteModule = modCode => {
        dispatch(deleteModule(modCode))
    }
    
    const modules = props.data.map (item => {
        if (item.moduleCredit !== undefined) {
            mc += parseInt(item.moduleCredit)
        }
        const date = (data) => {
            if(data.semesterData === undefined) {
                return "Not offered in this Semester"
            } else if (data.semesterData[props.semester] === undefined || data.semesterData[props.semester].examDate === undefined){
                return "No Exam"
            } else {
                return `Exam: ${format(new Date(data.semesterData[props.semester].examDate), "dd-MM-yyyy hh:mm a")}`
            }
            
        }
        return (
            <Grid item key = {item.moduleCode} xs={4} style = {{padding: "10px"}}>
                <Grid container direction = "row" alignItems = "flex-start" justify = "space-between">
                    <Grid item xs = {10} >
                        <Grid container direction = "column" alignItems = "flex-start">
                            <Typography variant = "subtitle2">{item.moduleCode} {item.title}</Typography>
                            <Grid container>
                                <Grid item xs ={12} >
                                    <Typography variant = "body2">{date(item)} • {item.moduleCredit} MCs</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {2}>
                        <IconButton onClick = {() => onDeleteModule(item.moduleCode)}><Clear/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    })
    
    return (

        <Container style = {{marginBottom: "20px" }}>
            <Divider style = {{marginTop: "20px", marginBottom:"20px"}}/>
            <Grid container direction = "row" justify = "flex-start" alignItems = "top">
                {(props.data === undefined || props.data.length === 0) ? (
                    <Typography variant = "subtitle2">Add a module to begin!</Typography>
                ):
                    modules
                }
                    
            </Grid>
                
            <Divider style = {{marginTop: "20px", marginBottom:"20px"}}/>
            <Grid container alignItems = "center">
                <Typography variant = "subtitle1">Total Module Credits: </Typography>
                <Typography variant = "subtitle1" style = {{fontWeight: "bold", paddingLeft: "5px"}}>{mc}</Typography>
            </Grid>
        </Container>

    )
}


export default ModulesView