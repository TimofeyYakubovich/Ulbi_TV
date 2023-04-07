// middleware каторый будет парсить сам URL
// module.exports = (req, res) => {
module.exports = (baseUrl) => (req, res) => {
    // при отпавке запроса получаем ошибку неправильный URL потому чо в объекте request поумолчанию хранится путь /users
    // а для работы с модулем URL нужен полный маршрут http://localhost:5000/users&param=123 и над получить полный маршрут
    // используем механизм замыкания сделеаем функцию аторая возвращает middleware каторая будет принимать базовый URL baseUrl все что идет 
    // до /users
    // и baseUrl передаем 2 аргуметом при создании объекта URL
    // оправляем запрос еще раз и получам объект URL  уаторого есть pathname эндпоинт и search searchParams Query параметры каторые надо парсить
    const parsedUrl = new URL(req.url, baseUrl) // создаем объект из глобального модуля URL, аргументом передаем url из запроса
    // console.log(parsedUrl)
    // Query параметры находятся в поле searchParams это объект типа URLSearchParams перенсем их в обычный объект
    // forEach проходимся по полю searchParams 1 аргумент значение 2 аргумент ключ передаем в объект params
    const params = {}
    parsedUrl.searchParams.forEach((value, key) => params[key] = value)

    req.pathname = parsedUrl.pathname // изменяем объект req добовляем к нему поле pathname и в нег записываем результат парсинга
    req.params = params; // изменяем объект req добовляем к нему поле params 
}