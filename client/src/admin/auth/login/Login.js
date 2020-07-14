import React, { useState, useContext, useEffect } from "react";
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../context';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Login = ({history, props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  localStorage.removeItem('authUser')
  const { loginStart, loginUserFail, loggedIn, loadUserData } = props

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
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  const { loginUser } = props

  const handleForm = e => {

    e.preventDefault();
    loginStart() //redux event

    if(!email) {
      setErrors('No email provided')
      return
    }
    else if(!password) {
      setErrors('No password provided')
      return
    }
    else if(!email && !password)  {
      setErrors('No email or password provided') 
      return
    }

    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) { 

            Auth.setLoggedIn(true)
            const uid = res.user.uid
            loginUser(res.user)

            //Initiate Load of all data into redux
            loadUserData(res.user)


            history.push(`/admin/${uid}/profile/`)
            //history.push(`/login`)
          }
        })
        .catch(e => {
          loginUserFail(e.message)//Redux action
          setErrors(e.message);
        });
      })
      console.log('Isloggedin', Auth.isLoggedIn)

  };

  const logout = () => {
    console.log('Current logged in user UID', firebase.auth().currentUser)

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      history.push('/')
      localStorage.removeItem('authUser')
      Auth.setLoggedIn(false);
    }).catch(function(error) {
      // An error happened.
      alert('Sign out error')
    });
  
   
  }


  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => { 
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result)
        const uid = result.user.uid
        loginUser(result.user)
        history.push(`/admin/${uid}/profile/`)
        Auth.setLoggedIn(true)
      })
      .catch(e => setErrors(e.message))
    })
   
  }
  //console.log('>', Auth)
  const classes = useStyles();

  return (
    <AuthContext.Consumer>
      {(isLoggedIn) => (
        <div>
        {/* https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side */}
          {/* <h2>Is logged in? {Auth.isLoggedIn ? 'yes' : 'no'}</h2> */}
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Typography component="h4" variant="h5">
                    <span>{error}</span>
                </Typography>

                <form className={classes.form} onSubmit={e => handleForm(e)} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}

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
                    onChange={e => setPassword(e.target.value)}
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
                  <button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="logo"
                    />
                    Login With Google
                  </button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/join" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>

              </div>
            </Grid>
          </Grid>
          { Auth.isLoggedIn && (
                <div>
                  <button onClick = {() => logout() } type="button">Logout</button>
                  </div>
              ) 
            }
            
        </div>
      )}
    </AuthContext.Consumer>

  );
};

export default withRouter(Login);
