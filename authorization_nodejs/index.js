const express = require('express')
// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000

const DB_URL = 'mongodb+srv://user:1234@cluster0.gab93g7.mongodb.net/?retryWrites=true&w=majority'



const app = express()

app.use(express.json())
app.use("/auth", authRouter)



const start = async () => {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();