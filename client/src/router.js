  
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeApp from './HomeApp';
import Public from './Public';
import Protected from './Protected';
import AdminIn from './AdminIn'
import AdminHome from './admin/components/admin-home';
import AddLand from './admin/components/add-land'
import AddImagery from './admin/components/add-imagery'
import ListedLand from './admin/components/listed-land';


import ErrorPage from './pages/error'
import * as firebase from 'firebase'

import LoginContainer from './admin/auth/login/container';
import JoinContainer from './admin/auth/join/container';

import Barns from './pages/barns'
import FAQ from './pages/faq'
import Fields from './pages/fields';
import IndividualField from './pages/individual-field'
import WeddingsAndEvents from './pages/weddings-and-events'
import Camping from './pages/camping'

import SearchResults from './pages/search-results'


import Owners from './pages/owners-container';

import Profile from './admin/components/profile'

const Router = (props) => {

return(
    
  //https://github.com/TarakeshS/protected-routes
  //https://medium.jonasbandi.net/hosting-multiple-react-applications-on-the-same-document-c887df1a1fcd
//possibly need to split the app into two apps?
        <Switch>
            <Route exact path="/" component={HomeApp}/>
            <Route exact path="/barns" component={Barns}/>
            <Route exact path="/fields" component={Fields}/>
            <Route exact path="/fields/:fieldId" component={IndividualField} />
            <Route exact path="/owners" component={Owners}/>
            <Route exact path="/weddings-and-events" component={WeddingsAndEvents}/>
            <Route exact path="/camping" component={Camping}/>
            <Route exact path="/faq" component={FAQ}/>
            <Route exact path="/search-results" component={SearchResults} props={props}/>

            
            <Route exact path='/admin/public' component={Public}/>
            <Route exact path='/login' component={LoginContainer}/>
            <Route exact path='/join' component={JoinContainer}/>

            <PrivateRoute exact path="/admin" component={AdminIn} props={props} />
            <PrivateRoute exact path="/admin/:uid/profile" component={Profile} props={props} />
            <PrivateRoute exact path="/admin/protected" component={Protected} props={props} />
            <PrivateRoute exact path="/admin/home" component={AdminHome} props={props}/>
            <PrivateRoute exact path="/admin/your-listed-land" component={ListedLand} props={props}/>

            <PrivateRoute exact path="/admin/land/add" component={AddLand} props={props}/>
            <PrivateRoute exact path="/admin/land/:owner/:fieldId/images/add" component={AddImagery} props={props}/>

            <Route path='/error' component={ErrorPage}/>
        </Switch>
  )
}


//https://medium.jonasbandi.net/hosting-multiple-react-applications-on-the-same-document-c887df1a1fcd
//possibly need to split the app into two apps?

const PrivateRoute = ({ component: Component, ...rest }) => {
//Auth.getAuth()

firebase.auth().onAuthStateChanged(authUser => {
  authUser
    ? localStorage.setItem('authUser', JSON.stringify(authUser))
    : localStorage.removeItem('authUser')
});


const allReadyAuthed = JSON.parse(localStorage.getItem('authUser'))
  return (
    <Route
      {...rest}
      render={props => {
        console.log(rest)
        const isAuthenticated = rest.props.login.loggedIn

        //return isAuthenticated || allReadyAuthed ? (   //allReadyAuthed is if we want persistant auth
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
      }
    />
  )
}


export default Router;