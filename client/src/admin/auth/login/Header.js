import React, { useContext } from "react";
import routes from "./routes";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";
import * as firebase from 'firebase'

const Header = ({history}) => {
  
  const {isLoggedIn} = useContext(AuthContext);

  const logout = () => {
    console.log('Current logged in user UID', firebase.auth().currentUser)

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert('Signed out ok')
      history.push('/')
    }).catch(function(error) {
      // An error happened.
      alert('Sign out error')
    });
  
   
  }

  return (
    <ul className="nav">
    
    { !isLoggedIn && routes.map((route, i) => (
      <li key={i}>
        <Link to={route.path}>{route.name}</Link>
      </li>
    ))}
    {isLoggedIn &&
    <button onClick = {() => logout() } type="button">Logout</button>
    }
  </ul>
  )
}


export default Header;
