"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

export default function Page() {
  /*
    This function does the actual work
    calling the fetch to get things from the database.
    */

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log("----->");
    console.log(data.data);
    if (data.data == "valid") {
      console.log("login is valid!");
      window.location.href = "/dashboard";
    } else {
      console.log("not valid  ");
    }
  }

  /*

    When the button is clicked, this is the event that is fired.
    The first thing we need to do is prevent the default refresh of the page.
    */

  const validateForm = (event) => {
    let errorMessage = "";
    const data = new FormData(event.currentTarget);
    // get the email
    let email = data.get("email");
    // pull in the validator
    var validator = require("email-validator");
    // run the validator
    let emailCheck = validator.validate(email);
    // print the status true or false
    console.log("email status" + emailCheck);
  };
  const handleSubmit = (event) => {
    console.log("handling submit");

    event.preventDefault();
    // call out custom validator
    let errorMessage = validateForm(event);
    // save the mesage
    setErrorHolder(errorMessage);
    // if we have an error
    if (errorMessage.length > 0) {
      setOpen(true);
    } else {
      // if we do not get an error
      const data = new FormData(event.currentTarget);
      let email = data.get("email");
      let pass = data.get("pass");
      console.log("Sent email:" + email);
      console.log("Sent pass:" + pass);
      console.log("calling db");
      runDBCallAsync(`api/login?email=${email}&pass=${pass}`);
    } // error message if
  }; // end handler

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  // first
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // second
  const [errorHolder, setErrorHolder] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errorHolder}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>{" "}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>{" "}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Pass"
              type="pass"
              id="pass"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In{" "}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password ?
                </Link>{" "}
              </Grid>{" "}
              <Grid item>
                <Link href="/register" variant="body2">
                  {" "}
                  {"Don't have an account? Sign Up"}{" "}
                </Link>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Box>{" "}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
