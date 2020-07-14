// const requestInitialProfile = () => {
//     console.log('insude request')
//     return fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then( res => {
//         console.log(res)
//         return res
//     })//then can be object name
//     .catch(error => console.log(error));
//     //.then(json => console.log(json.title))
// }

// export default requestInitialProfile


const requestInitialProfile = () => {
    console.log('inside initial profile request')
    return fetch ('http://localhost:3001/api/EWvoW0Dncoc7HNlnFyBkOYCTFlV/profile/')
    .then(response => response.json())
    .then( res => {
        console.log(res)
        return res
    })
    .catch(error => console.log(error));
}

export default requestInitialProfile