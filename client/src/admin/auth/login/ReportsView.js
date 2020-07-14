import React, { useContext }  from 'react'
import { AuthContext } from "./index";
import { auth } from 'firebase';
export default () => {
  console.log('reports')
  const Auth = useContext(AuthContext);
console.log(auth().currentUser.uid)
const userId = auth().currentUser.uid
  return (
    <div>
    User id is : { userId }
      
      reports

    
    </div>
  )
}
