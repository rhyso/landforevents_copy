const getDbUID = (uid) => {
    console.log(uid)
    console.log(process.env.REACT_APP_DEV_API_URL)
    return fetch (`${process.env.REACT_APP_DEV_API_URL}${uid}/getDBUID`)
    .then(response => response.json())
    .then(response => response.user )
    .catch(error => console.log(error));
}

export default getDbUID

