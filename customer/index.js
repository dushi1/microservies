const express = require('express');

const app = express()

app.use(express.json())

app.use('/', (req, res) => {
    console.log('request came from customer')
    return res.status(200).json({ "msg": "Hello from customers" })
})


app.listen(8001, () => {
    console.log('Customers service is running on 8001')
})



