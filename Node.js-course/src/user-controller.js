// перенесем сюда эндпоинты

// взамидействие с базой данных mongoDB
// для удобного взаимодействия устанавливаем пакет npm i mongoose
// mongoose это некаторая оболочка над mongoDB каорая позволяет не писать напрямую запросы к базе данных и пользоваться более удобным синтаксисом
// в зависимоости от типа базы данных это называется ODM или ORM

// const users = [ // массив пользователей
//     {id: 1, name: 'Ulbi tv'},
//     {id: 2, name: 'Vasya'}
// ]
const User = require('./user-model') // экспортруем сюда модель из файла user-model
// так как запросы к базе данных это асинхронный процес делаем эти функции асинхронными
// const getUsers = (req, res) => {
const getUsers = async (req, res) => {
    // if(req.params.id) { // если с клиента в параметрах пришел id то отправляем не весь массив users
    //     return res.send(users.find(user => user.id == req.params.id)) // а находим кокретного пользователя с id и отправляем его
    // }
    // res.send(users);
    let users;
    if(req.params.id) { // если с клиента в параметрах пришел id то находим кокретного пользователя с id
        users = await User.findById(req.params.id) // у модели User есть функция findById передаем в нее req.params.id
        // mongoose обратится к БД получит нужного пользователя и вернет нам его
    } else {
        users = await User.find() // у User модели вызываем функцию find() вернет все записи в БД каторые есть у этой модлеи
    }

    res.send(users);
}

// const createUser = (req, res) => {
const createUser = async (req, res) => {
    // const user = req.body;
    const user = await User.create(req.body); // не созадем на прямую а у User модели вызываем функцию create() туда передаем тело запроса
    // users.push(user);
    res.send(user);  // получившегося пользователя возврощаем обратного на клиент
}

module.exports = { // эеспортруем объект как ключ значение функции эндпоинты
    getUsers,
    createUser
}