const express = require('express');

const app = express()

app.use(express.json())

app.use('/', (req, res) => {
    console.log('request came from shopping')
    return res.status(200).json({ "msg": "Hello from Shopping" })
})


app.listen(8003, () => {
    console.log('Shopping service is running on 8003')
})



