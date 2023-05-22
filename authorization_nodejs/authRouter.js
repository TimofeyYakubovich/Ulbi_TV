const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./Middleware/authMiddleware')
const roleMiddleware = require('./Middleware/roleMiddleware')

// валидация устанавливаем пакет npm i express-validator, экспортируем функцию мидлвеер check из express-validator
// передаем ее 2 аргументом в router.post их можно передавать несколько
// в check 1 аргуент поле каторе надо валидировать 2 аргуент сообщение каторое выведется если валидация была не успешной
// username валидируем на наличие символов что бы не было пустое вызываем notEmpty()
// password валидируем по длине должен быть длиннее 4 и кароче 10 символов 

router.post('/registration',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 10})
], controller.registration)  // запрос на регистрацию

router.post('/login', controller.login)   // запрос на авторизацию

// в router.get('/users' 2 аргументом добовляем мидлвеер authMiddleware что бы к ней могли обращаться только зарегистрированые пользователи
// router.get('/users', authMiddleware, controller.getUsers)  // запрос для тестирования устанавливать различные доступы для пльзователя для админа и запрещать неаворизованым пользователям

// roleMiddleware исходная функция каорая возвращает мидлвеер, приниает массив разрешенных ролей для этого запроса
// router.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers)
// для каждой конкретной функции можно передавать этот мидлвеер и разрешать по ролям допустим администратору выдавать какие то права
// пользователю получать какие то данные менеджеру что менять
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router;