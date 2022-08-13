const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')
const dotenv = require('dotenv')

let config = dotenv.config().parsed

console.log(config);

app.use(cors())

app.get('/api', (req, res) => {
    axios.get('https://fierce-forest-77682.herokuapp.com/test_vehicles',{
        auth : {
            username: config.USERNAME,
            password: config.PASSWORD
        }
    })
    .then((response) => {
        
        res.send(response.data)
    })
    .catch((error) => {
        console.log(error);
    })
})

app.listen(3000, console.log('running on 3000'))