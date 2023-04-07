// модуль http и сделаем свой небольшой фреймворк по типу express
// const http = require('http'); // импортируем модуль http
// const EventEmitter = require('events')
const PORT = process.env.PORT || 5000; // порт будем получать из переменных окружения
// const Router = require('./framework/Router'); // импортируем сюда роутер

const Application = require('./framework/Application') // импортируем класс Application
const userRouter = require('./src/user-router'); // импорруем сюда уже user-router
const jsonParser = require('./framework/parseJson') // импортируем мидлвеер
const parsedUrl = require('./framework/parseUrl');
const mongoose = require('mongoose'); // импортруем mongoose

const app = new Application();

// const emitter = new EventEmitter();

// const server = http.createServer((req, res) => { //метод createServer создаем сервер 1 аргументом можно передать объект с опциями но он нас 
    // не интересует нас интересует RequestListener с помощью которого мы будем обрабатывать входящие соединения и возвращать пользователю ответ
    // сдесь будем работать со стримами Readable и Writable req и res сответственно запрос и ответ

    // если в браузере открыть http://localhost:5000/ плучим странные символы потому что поумолчанию кирилица невосприниается
    // для этого нужно указать нужные заголовки
    // res.writeHead(200, { // укажем статус код 200 
    //     // 'Content-type': 'text/html; charset=utf-8' // текст типа html кадеровка utf-8 
    //     'Content-type': 'text/html;'
    // })

    // res.end('Сервер работает') // что бы пользователь мог получить ответ от сервера надо закрыть стрим и передать туда какие то данные
    // именно эти данные получит пользователь на свой запрос

    // так как в качестве заголвка 'Content-type': 'text/html;' можно напрямую отправлять разметку
    // res.end('<h1>Hello World<button>sfsfgg</button></h1>')
    // получается Server Side Rendering кгда html генерируется на сервере и отправляется на клиент


    // но мы будем делать сервер с rest api тоесть будем обмениваться данными в формате json

    // у объекта req есть поле url будем отправяль его на клиент
    // res.end(req.url); // поле url это то что мы указываем после / http://localhost:5000/dtfhghf

    // таким образом можно генерировать ряд каких то эндпоинтов и на каждом эндпоинте будет своя логика

    // что бы отправлять данные в формате json нодо добавить заголовок 'Content-type': 'application/json' браузер будет явно понимать что 
    // сервер ему отправил строку в формате json
    // res.writeHead(200, {
    //     'Content-type': 'application/json'
    // })

    // if (req.url === '/users') { // например сделаем эндпоинт http://localhost:5000/users если пользователь отправил запрос с таким адресом
    //     // return res.end('USERS') // то будем возвращать просто строку 'USERS'
    //     // поскольку стрим поумолчанию работает с буфером или стркой надо JS объект преобразовать с помощью stringify к строке
    //     return res.end(JSON.stringify([{ // это будет массив с 1 объекотм у каторого есть id и name
    //         id: 1, name: 'Ulbi tv'
    //     }])) 
    // }
    // if (req.url === '/posts') { // например сделаем эндпоинт http://localhost:5000/posts если пользователь отправил запрос с таким адресом
    //     return res.end('POSTS') // то будем возвращать просто строку 'POSTS'
    // }

    // res.end(req.url);
// }) 

// для го что бы сервер начал слушать входящие соединения надо вызваь у него функцию listen 1 аргументом передать PORT
// 2 аргументом передаем колбек каторый оработает если сервер запустился успешно
// server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`)) 

// если запускать приложение с помощью nodemon то в режиме разработки он на каждое изменение будет перезапускаь наше приложение что бы не 
// делать это в ручную




// используе класс Router создаем из него объект 
// const router = new Router(); // и у этог объекта доступен пока что 1 метод request
// router.request('GET')

// сделаем эндпоинты гет запрос по адресу /users
// router.get('/users', (req, res) => { // 1 аргументом передаем путь /users 2 аргументом тот самый handler каотрый параметрами принимает req, res
//     res.end('YOU SEND REQUEST TO /USERS') // вернем обычное собщение на клиент
// })

// router.get('/posts', (req, res) => {
//     res.end('YOU SEND REQUEST TO /POSTS')
// })

// const server = http.createServer((req, res) => {
//     // событие в классе в методе request создали подписались на него emitter.on(`[${path}]:[${method}]`
//     // генерировать событие будем при создании сервера 
//     // когда событие создавали в колбеке ожидает 2 аргумента (req, res) и сдесь когда событие эммитем надо эти параметры передать
//     // emitter.emit(`[${req.url}]:[${req.method}]`, req, res) // вызываем функцию emit и по маске `[${path}]:[${method}]` событие эммитем
//     // обработаем ситуацию когда пользователь отправил запрос на несуществующий адрес
//     const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res);
//     if (!emitted) { // когда эмитим событие возврощается булинове значение оно = false если такова событи несуществует
//         res.end();  // закрываем стрим если такова событи несуществует что бы запрос не весел бесконечно
//     }
// })

// server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`)) 


// на данный момент у нас есть router с 2 эндпоинтами каторые обрабатывают get запросы
// app.addRouter(router); // с помощью метода addRouter добовляем этот router в Application

app.use(jsonParser); // подключаем мидлвеер для парсинга JSON функцию не вызываем а передаем как ссылку
app.use(parsedUrl('http://localhost:5000')); // сразу вызываем функцию и передаемв нее базовый юрл

app.addRouter(userRouter); // в addRouter  добовляем уже userRouter


// app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))

const start = async () => {
    try { // бернем все в try catch что бы тлавливать ошибки так как в момент подключения к базе данных может указан неправльный URL или настройки
        // await mongoose.connect('mongodb+srv://user:123@cluster0.wccvnbs.mongodb.net/node-js-course?retryWrites=true&w=majority') 
        // await mongoose.connect('mongodb://user:123@ac-dj3gptg-shard-00-00.wccvnbs.mongodb.net:27017,ac-dj3gptg-shard-00-01.wccvnbs.mongodb.net:27017,ac-dj3gptg-shard-00-02.wccvnbs.mongodb.net:27017/?ssl=true&replicaSet=atlas-gpz7cm-shard-0&authSource=admin&retryWrites=true&w=majority') 
        // await mongoose.connect('mongodb+srv://user:123@cluster0.wccvnbs.mongodb.net/?retryWrites=true&w=majority')
        // await mongoose.connect('mongodb://user:123@ac-dj3gptg-shard-00-00.wccvnbs.mongodb.net:27017,ac-dj3gptg-shard-00-01.wccvnbs.mongodb.net:27017,ac-dj3gptg-shard-00-02.wccvnbs.mongodb.net:27017/?ssl=true&replicaSet=atlas-gpz7cm-shard-0&authSource=admin&retryWrites=true&w=majority')
        await mongoose.connect('mongodb+srv://user:123@cluster0.wccvnbs.mongodb.net/?retryWrites=true&w=majority')


        // асинхроная функция connect() нужна что бы подключиться к базе данных
        // в функцию connect() надо передать URL к базе данных
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();

