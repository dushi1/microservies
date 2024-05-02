const express = require('express');

const app = express()

app.use(express.json())

app.use('/', (req, res) => {
    console.log('request came from product')
    return res.status(200).json({ "msg": "Hello from Products" })
})


app.listen(8002, () => {
    console.log('Products service is running on 8002')
})



