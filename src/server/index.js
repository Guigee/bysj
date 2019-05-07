const express=require('express')
const app=express()
const mongoose = require('mongoose')
const album = require('./routes/Album')
const connecters=require('./routes/connecters')

mongoose.connect('mongodb://localhost/bysj',{useNewUrlParser:true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error(`Could not connect to MongoDB`))

app.use(express.json())
app.use('/api/connecters',connecters)
app.get('/image/:imgUrl',(req,res)=>{
    res.sendFile(__dirname + `/file/${req.params.imgUrl}`)
})
app.use('/api/album',album)
const port = process.env.port || 3000
app.listen(port,()=>console.log(`Listening port ${port}`))