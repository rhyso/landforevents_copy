import React, { useState, useEffect } from "react";
import "./styles.css";
import { withRouter } from 'react-router-dom';

import * as firebase from "firebase";
import firebaseConfig from "./firebase.config";


import Login from "./Login"
import { AuthContext } from '../context';
import configureStore from '../../../store';

firebase.initializeApp(firebaseConfig);



const LoginHome = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  console.log(props.fetched)//this means redux store is connected
  
  const readSession = () => {
    
    console.log(isLoggedIn)
    
    const user = window.sessionStorage.getItem(
			`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
		);
    
    if (user) setLoggedIn(true)
    
  }
  useEffect(() => {

    readSession()

  }, [])

  //https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/



  return (
     <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }} store={configureStore()}>
        <div>
        {/* Is logged in here? {JSON.stringify(isLoggedIn)} */}
        <div className="App">
            <Login props={props} />
        </div>
        </div>
      </AuthContext.Provider>

  );
}

export default withRouter(LoginHome);












// function LoginHome() {
//   const [isLoggedIn, setLoggedIn] = useState(false);
  
//   function readSession() {
//     const user = window.sessionStorage.getItem(
// 			`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
// 		);
// 		if (user) setLoggedIn(true)
//   }
//   useEffect(() => {
//     readSession()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
//       Is logged in? {JSON.stringify(isLoggedIn)}
//       <div className="App">
//         <Router>

//           <Header isLoggedIn={isLoggedIn}/>

//           <Switch>
//             {protectedRoutes.map(route => (
//               <ProtectedRouteHoc
//                 key={route.path}
//                 isLoggedIn={isLoggedIn}
//                 path={route.path}
//                 component={route.main}
//                 exact={route.exact}
//                 public={route.public}
//               />
//             ))}
//             {routes.map(route => (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 exact={route.exact}
//                 component={route.main}
//               />
//             ))}
//           </Switch>
//         </Router>
//       </div>
//     </AuthContext.Provider>
//   );
// }

// export default withRouter(LoginHome);
