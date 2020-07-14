const requestOpenAPi = () => {
    console.log('insude request')
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then( res => {
        console.log(res)
        return res
    })//then can be object name
    .catch(error => console.log(error));
    //.then(json => console.log(json.title))
}

export default requestOpenAPi



