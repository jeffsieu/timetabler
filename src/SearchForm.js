import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'

function SearchForm() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="mod"
              label="Module Code"
              name="mod"
            />
          </Grid>
        </Grid>              
        <Button
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

export default SearchForm;