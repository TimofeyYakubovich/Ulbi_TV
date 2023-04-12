// сначало надо проинициализировать проект npm init -y  
// npm i express
// "start": "node index.js"
// console.log('SERVER WORKING')
// что бы импортировать файл express в файле package.json добвляем "type": "module", импорты и экспорты будут работать в среде node

// npm i -D nodemon устанавливаем нодмонитор "dev": "nodemon index.js"
import express from 'express'
import mongoose from 'mongoose';
// express-fileupload с помощью него можно удобно работать с файлами
import fileUpload from 'express-fileupload';

// import Post from './Post.js'; // импортируем модель
import router from './router.js'; // что бы все работало через роутер импортируем его сюда и тут его надо зарегестрировать

const PORT = 5000;

const DB_URL = 'mongodb+srv://user:123@cluster0.awaw6xf.mongodb.net/?retryWrites=true&w=majority'

const app = express() // создаем экземпляр приложения

app.use(express.json())
app.use(fileUpload())
app.use('/api', router) // регестрируем роутер будет отрабатывать по юрл /api таких роутеров можно указывать несколько например
// app.use('/users', userRouter)

// если сделаем гет запрос http://localhost:5000/e1e19f8c-35a4-4e0c-9dd2-6a8d49f6e480.jpg просто через / вставим название каринки 
// получим ошибку, что бы научить сервер отдавать статические файлы изображения
// добовляем еще один мидлвеер и указываем путь к папке
app.use(express.static('static'))
// таким образом в браузере в теге img в атрибуте src можно указать адрес путь к этому файлу

// app.get('/', (req, res) => { // эндпоинт каторый обрабатывает get запрос 1 аргумент путь 2 аргумент функция будет выполняться по запросу на эндпоинт
//     // у объекта req есть поля поисковая строкаа, параметры поисковой строки, заголовки, тело запроса
//     // делам get запрос http://localhost:5000/?test=123&query=ggttht&third=affsa
//     console.log(req.query) // query параметры получаем { test: '123', query: 'ggttht', third: 'affsa' }
//     console.log(req.query.test) // получаем 123
//     res.status(200).json('Сервер работает123')
// })

// app.post('/', async (req, res) => {
//     // тело запроса передают в POST или PUT запросе
//     // // делам post запрос http://localhost:5000/ с телом { "name": "ulbi tv500ftft0", "password": "123" }
//     // console.log(req.body); получаем undefined потому что express поумолчанию неможет преобразовать JSON формат надо ему это указать app.use(express.json())
//     // console.log(req.body); // получаем { name: 'ulbi tv500ftft0', password: '123' }
//     try {
//         const {author, title, content, picture} = req.body; // делаем диструктуризацию и из тела запроса вытскиваем нужные поля
//         // сохраним Post в БД у модели вызываем функцию create в каторую гадо передать объект соответствующий модели Post
//         const post = await Post.create({author, title, content, picture}) 
//         // res.status(200).json('Сервер работает123')
//         res.json(post)
//     } catch (e) {
//         res.status(500).json(e) // если возникла ошибка возаращаем 500 статус код и саму ошибку e
//     }
// })

// app.listen(PORT, () => console.log(`Server started on PORT ` + PORT))

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server started on PORT ` + PORT))
    } catch(e) {
        console.log(e)
    }
}

startApp()