// экспортируем объект с полем secret в катором рандомный ключ этот ключ будет знать только сервер
// в отдельный файл для того что бы использовать и в других местах
module.exports = {
    secret: "SECRET_KEY_RANDOM"
}