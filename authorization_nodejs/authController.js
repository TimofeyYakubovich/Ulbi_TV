const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
// validationResult возврощает ошибки полученные в следствии валидации
const jwt = require('jsonwebtoken')

const User = require('./models/User');
const Role = require('./models/Role');
const {secret} = require('./config')

// параметрами будет прнимать id пользователя и его роли для того что бы внутрь токена спрятать эту информацию (payload)
const generationAccessToken = (id, roles) => { 
    const payload = {
        id,
        roles
    }
    // функция должна вернуть токен для этого вызываем функцию jwt.sign 1 аргумент payload объект с данными каторые надо спрятать в токен
    // 2 аргумент секпетный ключ по этому секретному ключу будет расшифровываться токен config.js
    // 3 аргумент объект опций указываем сколько будет жить токен 24ч
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration (req, res) {
        try {
            // в начале функции получаем ошибки в переменную errors
            const errors = validationResult(req); // в validationResult передаем запрос req она вынимает из него нужные поля и валидирует их
            if (!errors.isEmpty()) { // если массив errors не пустой
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const condidate = await User.findOne({username});
            if (condidate) { // проверяем есть ли пользователь с таким username в бд
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7); // хешируем пароль 7 степень хеширования
            const userRole = await Role.findOne({value: "USER"}) // достаем из бд объект роль USER
            // const userRole = await Role.findOne({value: "ADMIN"}) // что бы зарегистрировать админа
            const user = new User({username, password: hashPassword, roles: [userRole.value]}) // в roles передаем из объекта userRole только value
            await user.save();
            return res.json({message: "Пользоатель успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login (req, res) { // авторизация
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) { // если пользователь не был найден объект пустой то возврщаем ошибку
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            // сравниваем пароли в бд и теле запроса
            // validPassword получит логическое значение валидин пароль или нет
            // функция compareSync сравнивает захешированый пароль и обычный 1 обычный пароль 2 захешированый
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) { // если пароль не валидный
                return res.status(400).json({message: `Введен не верный пароль`})
            }
            // далее сгенерируем JWT Token  npm i jsonwebtoken
            // в переменную token будет возврощаться резульат рабоы функции generationAccessToken
            const token = generationAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find()
            res.json(users)
            // сделаем что бы список пользователей могли получать только администраторы
            // реализуем логику что к этой функции могут обращаться все зарегестрированые пользователи затем пользователи с конкретной ролью

            // // создадим 2 роли в бд но делать для этого отдельный эндпоинт не буедм создадим их прямо сдесь
            // const userRole = new Role() // для юзера default: "USER"
            // const adminRole = new Role({value: "ADMIN"})
            // await userRole.save() // функция save сохроняет в бд
            // await adminRole.save()
            // res.json("server work")
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController();