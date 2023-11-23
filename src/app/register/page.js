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

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

export default function Register() {
  /*
    This function does the actual work
    calling the fetch to get things from the database.
    */

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data == "valid") {
      console.log("login is valid!");
    } else {
      console.log("not valid  ");
    }
  }

  /*

    When the button is clicked, this is the event that is fired.
    The first thing we need to do is prevent the default refresh of the page.
    */
  const handleSubmit = (event) => {
    console.log("handling submit");

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let email = data.get("email");
    let reEmail = data.get("reEmail");
    let pass = data.get("pass");
    let address = data.get("address");
    let telephone = data.get("telephone");
    let dob = data.get("dob");
    console.log("Sent username:" + username);
    console.log("Sent email:" + email);
    console.log("Sent reEmail:" + reEmail);
    console.log("Sent pass:" + pass);
    console.log("Sent address:" + address);
    console.log("Sent telephone:" + telephone);
    console.log("Sent date of birth" + dob);

    runDBCallAsync(
      `http://localhost:3000/api/register?username=${username}&email=${email}&reEmail=${reEmail}&pass=${pass}&address=${address}&telephone=${telephone}`
    );
  }; // end handler

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
            Register{" "}
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
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
              id="reEmail"
              label="Re-enter Email address"
              name="reEmail"
              autoComplete="reEmail"
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="telephone"
              label="Telephone Number"
              name="telephone"
              autoComplete="telephone"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dob"
              label="Date of Birth"
              name="dob"
              type="text"
              autoComplete=""
              autoFocus
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
              Register{" "}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password ?
                </Link>{" "}
              </Grid>{" "}
              <Grid item>
                <Link href="../" variant="body2">
                  {" "}
                  {"Have an account? Sign in"}{" "}
                </Link>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Box>{" "}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
