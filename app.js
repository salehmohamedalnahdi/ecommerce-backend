const express= require('express')
const app= express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const routes=require('./routes/route.js')
const middleware= require('./middleware/middleware.js')



app.use(middleware);
app.use('/',routes)
app.listen(3000,()=>console.log("connecting is done"))















