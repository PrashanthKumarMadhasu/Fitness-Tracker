const express=require('express')
const app=express()
const connectDB=require('./database/connect')
const tasks=require('./routes/tasks')

require('dotenv').config()

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//middleware

app.use(express.json())


app.get('',async(req,res)=>{
    res.send("Home Page")
})

app.use('/api/v1/users',tasks)

const port=process.env.PORT || 3000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log("Server is Running"))
    } catch (error) {
        console.log(error)
    }
}

start()
















console.log("Hello Welcome to Node Backend")