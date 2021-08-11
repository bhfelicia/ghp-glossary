import React, { Component } from "react";
import { connect } from "react-redux";
import { Link as RLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { addUser } from "./store/users";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        InstaCode
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      password: "",
      email: "",
      message: "Already have an account? Sign in",
      isCreated: false,
    };
    this.userDetailsHandler = this.userDetailsHandler.bind(this);
    this.createUserHandler = this.createUserHandler.bind(this);
  }

  userDetailsHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createUserHandler(event) {
    event.preventDefault();
    const newUser = { ...this.state };
    this.props.createUser(newUser);
    this.setState({
      message:
        "Your account has been created! You can now log in with your credentials.",
      isCreated: true,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              onSubmit={this.createUserHandler}
              className={classes.form}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    type="text"
                    value={this.state.first}
                    name="first"
                    onChange={this.userDetailsHandler}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="lname"
                    type="text"
                    value={this.state.last}
                    name="last"
                    onChange={this.userDetailsHandler}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.userDetailsHandler}
                    required
                    placeholder="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Password"
                    id="password"
                    autoComplete="current-password"
                    type="password"
                    value={this.state.password}
                    name="password"
                    onChange={this.userDetailsHandler}
                    required
                    placeholder="password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              {/* <Grid container justify="flex-end"> */}
              {/* <Grid item> */}
              {/* <RLink to="/" variant="body2">
                    Already have an account? Sign in
                  </RLink> */}
              {/* </Grid> */}
              {/* </Grid> */}
            </form>
            <RLink to="/">
              <Link variant="body2" color="primary">
                {this.state.message}
              </Link>
            </RLink>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(addUser(user)),
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(null, mapDispatchToProps)(SignUp)
);
