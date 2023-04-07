// создание и инициализация маршрутов связаных с пользователями

const Router = require('../framework/Router') // импортируем роутер 
const controller = require('./user-controller')
const router = new Router();

// const users = [ // массив пользователей
//     {id: 1, name: 'Ulbi tv'},    
//     {id: 2, name: 'Vasya'}
// ]

// router.get('/users', (req, res) => {
//     // но если не казывать никаих заголовков то браузер будет воспринимать это как обычный текст строку а надо что бы он понимал что это JSON
//     // res.writeHead(200, { // дбовляем заголовок метод writeHead 1 аргумент статус код 200
//     //     'Content-type': 'application/json'
//     // })
//     // res.end(JSON.stringify(users)); // JSON.stringify преобразуем users к JSON строке

//     // Query параметры это параметры каторые указываются после ? в URL 
//     // если указать Query параметры сейчас то наш фреймврок восприниает их как другой адрес
//     console.log(req.params) // отправляем запрос http://localhost:5000/users?id=1&page=5 в логи получаем объект { id: '1', page: '5' }
//     if(req.params.id) { // если с клиента в параметрах пришел id то отправляем не весь массив users
//         return res.send(users.find(user => user.id == req.params.id)) // а находим кокретного пользователя с id и отправляем его
//     }

//     // теперь в эндпоинтах нам не надо каждый раз прописывать заголовки парсить JSON это будет делать middleware функцией send
//     res.send(users);

// })

router.get('/users', controller.getUsers) // передаем как хендлеры функции из controller

// router.post('/users', (req, res) => { // убедимся что не получится создать 2 одинаковых маршрута
//     // res.end(JSON.stringify(users)); // JSON.stringify преобразуем users к JSON строке

//     // у каждого запроса есть тело body и надо что бы в этом теле приходил объект users в формате JSON 
//     console.log(req.body) // выведем это толе в логи
//     const user = req.body;
//     users.push(user); // плученый объект добавим в массив users позже этот массив заменем на базу данных
//     res.send(user); // и на клиент поитгу вернем этот объект user
//     // res.send(users); // 
//     // отправляем пост запрос с объектом JSON и получаем пустой ответ тело undefined дело в том что req это Readable stream и для того что бы 
//     // получить тело запроса надо с помощью стрима его прочитать
// })

router.post('/users', controller.createUser)

module.exports = router;