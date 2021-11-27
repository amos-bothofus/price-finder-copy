import { Button, Grid, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'
import { BASEAPI } from '../../../util/base-api-url'
import { setAuthToken } from '../../../util/setAuthToken'
import Loader from '../../loader/Loader'

const useStyles = makeStyles((theme) => {
  return {
    loginPage: {
      //   border: "1px solid red",
      height: "100vh",
    },
    formCon: {
      // border: "1px solid blue",
      [theme.breakpoints.down("sm")]: {
        padding: "1rem",
      },
    },
    formContentCon: {
      //   border: "1px solid black",
    },
    textField: {
      width: "100%",
    },
    signInBtn: {
      width: "100%",
    },
  };
});
const Login = ({ setAuthentication }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const login = async () => {
    const { email, password } = formData;
    if (email === "" || password === "") return alert("Why?");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      setLoading(true);
      const res = await axios.post(`${BASEAPI}auth/login`, body, config);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      if (res.data.token) {
        setAuthentication(true);
        history.push("/");
        setAuthToken(res.data.token);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const changeHan = (event) => {
    // console.log(event.target.name);
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Grid container justifyContent="center" className={classes.loginPage}>
      <Grid item sm={6} xs={12} className={classes.formCon} alignSelf="center">
        <Grid
          container
          item
          direction="column"
          className={classes.formContentCon}
          spacing={2}
        >
          <Grid item>
            <TextField
              onChange={changeHan}
              name="email"
              value={formData.email}
              className={classes.textField}
              type="email"
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={changeHan}
              name="password"
              value={formData.password}
              className={classes.textField}
              type="password"
              label="password"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button className={classes.signInBtn} onClick={login}>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {loading && <Loader />}
    </Grid>
  );
};

export default Login;
