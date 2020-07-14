import React, { Fragment, useState, useContext } from "react";
import { AuthContext } from "../context";
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Join = ({ history, props }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);
  
  const { joinStarted } = props
  const Auth = useContext(AuthContext);

  //put into constants file
  const JOIN_BY_EMAIL = 'JOIN_BY_EMAIL'
  const JOIN_VIA_GOOGLE = 'JOIN_VIA_GOOGLE'

  const classes = useStyles();

  const validateClient = () => {
    let valid = true;
    if(!firstName) {
      let err = 'No first name provided'
      setErrors(errors => [...errors,  err ])
      valid = false
    }
    else if(!surname) {
      let err = 'No surname'
      //setErrors('No surname provided')
      setErrors(err)
      valid = false
    }
    else if(!email) {
      setErrors('No email provided')
      valid = false
    }
    else if(!password) {
      setErrors('No password provided')
      valid = false
    }
    else if(!confirmPassword) {
      setErrors('Need to confirm the password provided')
      valid = false
    }
    else if(password !== confirmPassword){
      setErrors(`Password doesn't match`)
      valid = false
    }
    else if(!email && !password)  {
      setErrors('No email or password provided') 
      valid = false
    }
    return valid
  }

  const handleForm = e => {
    e.preventDefault();

    if (validateClient()){

      joinStarted(JOIN_BY_EMAIL)
      firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
          const { user } = res
           if (user) {
             return setUpUser(user)
             .then(res => {
              console.log('Isloggedin', Auth.isLoggedIn)
             })
           }
     
          })
          .catch(e => {
            setErrors(e.message);
          });
        })
    }

  };


  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    joinStarted(JOIN_VIA_GOOGLE)

    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log(result)
          history.push('/reports')
          //Auth.setLoggedIn(true)
        })
        .catch(e => setErrors(e.message))
      })
 
  }
//   const submitValues = values => {
//     console.log(values)
//     axios.post(`${serverPath}/api/addField`, values)
//     .then(response => console.log(response))
//     .catch((err) => console.log(err))
//     .then(setTimeout(() =>
//     window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
//     , 700) )
// }

const setUpUser = (user) => {
  const { uid } = user

  // ${process.env.REACT_APP_API_BASE}/api/v1/users/login/
  return axios.post(`http://localhost:3001/api/${uid}/profile/create`, {
    email: email,
    firstName: firstName,
    surname:surname
  })
  .then(res => {
    Auth.setLoggedIn(true);
    const { loginUser } = props
    console.log('this should be the users', res)

    loginUser(res.data.user)

    history.push(`/admin/${uid}/profile/`)
  }).catch(err => {
    console.log(err);
  })

}

  return (

    //possible client side validation idea
    //https://gist.github.com/seanmavley/b6355768b7de079a58c70cdc27be710e
    <Fragment>

    <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Badge color="secondary">
                <Typography>Land Owner</Typography>
            </Badge>
            <form className={classes.form} onSubmit={e => handleForm(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={e => setSurname(e.target.value)}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    id="confirm-password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
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
              <span>{errors}</span>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? <a href="/login/">Sign In</a>
                  </Link>
                </Grid>
              </Grid>
              <button onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="logo"
                />
                Join With Google
              </button>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
    </Fragment>

  );
};

export default withRouter(Join);
