const express = require('express');
const cors = require('cors')
const app = express()
const proxy = require('express-http-proxy')

app.use(express.json())
app.use(cors())

app.get('/customers', proxy('localhost:8001'))
app.get('/shopping', proxy('localhost:8003'))
app.get('/', proxy('localhost:8002'))  // product endpoint

app.listen(8000, () => {
    console.log('Products service is running on 8000')
})



