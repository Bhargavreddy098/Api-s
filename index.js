const express = require('express')
const db=require('./Db')
// const { request } = require('http')
const  route = require('./routes/Route')
const productroutes=require('./routes/Productroute')
const cors=require('cors')
const app = express()
app.use(express.json())
app.use(cors())
// app.get('/', (request, response) => {  
//     response.send('server running success')
// })
// app.get('/items', (request, response) => {
//     response.send('server running successfully')
// }) 
app.use('/', route) 
app.use('/',productroutes)
db()
const port = 3009
app.listen(port, () => {
    console.log(`server running successfully${port}`)
})