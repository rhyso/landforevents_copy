import axios from 'axios';
///:owner/field/:id/delete'
const removeLand = (uid, fieldId) => {
    console.log('remove land request')
    return axios.post(`${process.env.REACT_APP_DEV_API_URL}${uid}/field/${fieldId}/delete`)
    .then(response => response.json())
    .then( res => {
        console.log(res)
        return res
    })
    .catch(error => console.log(error));
}

export default removeLand

