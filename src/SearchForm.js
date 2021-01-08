import React, { Component } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const API_URL = 'https://api.nusmods.com/v2/2020-2021/modules'

export default function SearchFrom() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="mod"
              label="Module Code"
              name="mod"
            />
          </Grid>
        </Grid>              
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained" 
          color="primary"
        >
          Search
        </Button>
      </form>
    </Container>    
  );
}