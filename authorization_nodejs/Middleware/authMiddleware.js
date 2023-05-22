// мидлвеер каторый будет давать доступ к той или иной функции только зарегистрированым пользователям
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req, res, next) { // принмает запрос, ответ и функцию next каторая вызывет по цепочке следующий мидлвеер
    // если метод запроса OPTIONS вызываем следующий по цепочке мидлвеер, проверять будем все остальные запросы
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        // токены отправляют заголовки авторизации (authorization) и обычно он имеет такой вид "Bearer fsrgsrgstghsthsththryys"
        // указывается ключевое слово Bearer это тип токена затем сам токен зашифрованая строка
        // вытаскиваем токен из заголовка, так как нас интересует сам токен а не его тип делим стрку на 2 части по пробелу и берем 2 часть
        const token = req.headers.authorization.split(' ')[1]
        if (!token) { // если токена нет возвращаем ошибку
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        // если токен есть декадируем его для этого импортируем const jwt = require('jsonwebtoken')
        // функция verify проверяет токен 1 сам токен 2 секретный ключ теперь в decodedData будет лежать объект с id, и ролями пользователя roles
        const decodedData = jwt.verify(token, secret)
        // затем что бы эти данные огли использовать внутри других функций в запросе создаем новое поле user и туда передаем эти данные
        req.user = decodedData;
        next();

    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};