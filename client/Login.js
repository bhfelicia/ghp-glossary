import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import GitHubIcon from "@material-ui/icons/GitHub";

import { userInfo } from "./store/users";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://insta-code.herokuapp.com/#/">
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      auth: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
    this.attemptTokenLogin = this.attemptTokenLogin.bind(this);
  }
  componentDidMount() {
    this.attemptTokenLogin();
    this.setState({ auth: this.props.userData });
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    this.signIn({
      email,
      password,
    });
  }
  async signIn(credentials) {
    try {
      let response = await axios.post("/api/users/admin", credentials);
      const { token } = response.data;
      if (token) {
        window.localStorage.setItem("token", token);
      }
      this.attemptTokenLogin();
    } catch (error) {
      alert("Invalid username and/or password");
    }
  }
  logout() {
    window.localStorage.removeItem("token");
    this.setState({ auth: {} });
  }
  async attemptTokenLogin() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/users/admin", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        await this.props.userInfo(response.data);
        this.props.history.push({
          pathname: "/",
        });
      }
    }
  }
  render() {
    const { classes } = this.props;
    const { onChange, onSubmit, logout } = this;
    const { email, password, auth } = this.state;
    if (!auth.id) {
      return (
        <div>
          <AppBar position="relative">
            <Toolbar id="signInNav">
              <Typography variant="h4" color="inherit" noWrap>
                Power Programmers MiniLearn
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={onSubmit} noValidate>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={onChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/#/signup" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
              <a href={`/auth/github`}>
                <GitHubIcon
                  style={{
                    fontSize: 40,
                    color: "black",
                    margin: "1.5rem",
                  }}
                />
              </a>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          Welcome {auth.fullName}
          <button onClick={logout}>Logout</button>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ users: currentUser }) => ({
  userData: currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  userInfo: (user) => dispatch(userInfo(user)),
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
