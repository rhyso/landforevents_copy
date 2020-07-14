import axios from 'axios';

const getCurrentOwner = (dbUID) => {
    console.log('init get current user', dbUID)

    return axios.get(`${process.env.REACT_APP_DEV_API_URL}owner/get/${dbUID}`)
      .then(response => response.json())
      .then(response => response.data )
      .catch(error => console.log(error) )
  }

  export default getCurrentOwner