// мидлвеер каторый будет давать доступ к той или иной функции только администраторам
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) { // что бы мидлвеер узнаал какие роли разрешены какие нет воспользуемся замыканием будем из этой функции
    return function (req, res, next) { // возврощать еще одну функию катороая будет являтся мидлвеер
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }

        // const decodedData = jwt.verify(token, secret)
        // req.user = decodedData;

        // из токена достаем массив ролей декодируя токен
        const {roles: userRoles} = jwt.verify(token, secret)
        // проверяем есть ли в списке ролей те роли каторые разрешены для этой функции, сделаем переменную каторая будет либо false либо true
        let hasRole = false
        userRoles.forEach(role => { // итерируемся по ролям пользователя forEach 
            // и в условии проверяем если массив разрешенных ролей roles содержит в себе роль каторая есь у пльзователя role
            if (roles.includes(role)) { // тогда эта функция будет разрешена
                hasRole = true;
            }
            if (!hasRole) { // если роль не разрешена возвращаем ответ на клиент
                return res.status(403).json({message: "У вас нет доступа"})
            }
        })

        next();

    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
    }
}