import React, { Fragment } from 'react';

const requestListedFields = (uid) => {
    console.log(uid)
    console.log('inside initial profile request')
    console.log(process.env.REACT_APP_DEV_API_URL)
    
    return fetch (`${process.env.REACT_APP_DEV_API_URL}${uid}/getDBUID`)
    .then(response => response.json())
    .then((res)=>{
        const dBUID = res.user
        console.log('Datebase owner uid is',dBUID )
        const dbid = res.user
        console.log(res)
        return fetch (`${process.env.REACT_APP_DEV_API_URL}${dbid}/fields/`)
    .then(response => response.json())    
    .then( data => {
        console.log(data.fields)
        return data.fields
    })
    .catch(error => console.log(error));
})
}

export default requestListedFields