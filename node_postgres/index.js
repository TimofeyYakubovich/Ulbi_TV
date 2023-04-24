// сделаем Rest API на Node JS с использованием express  и субд postgresql
// проинициализируем  проект npm init -y
// npm install express pg устанавливаем express и модуль pg для работы с postgresql
// npm i -D nodemon
const express = require('express')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')

const PORT = process.env.PORT || 8080;


const app = express();

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', postRouter)

// app.get('/', (req, res) => {
//     res.send('HELLO POSTGRES + NODEJS!!!!');
// })

app.listen(PORT, () => console.log(`server started on port ${PORT}`));