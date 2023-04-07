// в Application.js будет обертка над самим сервером и инкапсуляция EventEmitter
// сдесь будем создавать и инкапсулировать http сервер и EventEmitter импртируем http и events

const http = require('http');
const EventEmitter = require('events')

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter(); // внутри конструктора создаем объект emitter
        this.server = this._createServer() // сервер инициализируем вызвав метотд _createServer
        this.middleware = [] // массив middleware будет содержать в себе функции каторые поцепочке будут вызываться перед каждым запросом
    }

    // метод use каторый будет добовлять middleware
    use(middleware) {
        this.middleware.push(middleware); // у массива вызываем метод push каторый туда добовляет переданый middleware
    }

    listen(port, callback) { // функция будет запускать http сервер принимает порт и callback каорый отработает когда сервер запустится
        this.server.listen(port, callback)
    }

    // так как у одного приложения может быть несколько роутеров сделаем меод каторый будет эти роутеры добавлять
    // endpoints = {
    //     '/users': {  как ключ будем добовлять адрес какова то эндпоинта как значение еще один объект 
    //     'GET': handler1,   в катором как ключ будет метод GET POST DELETE а под значение будет какой то handler тоесть обработчик
    //     'POST': hadler2,   тоесть функция каторя на этот эндпоинт должна отработать
    //     'DELETE': handler3
    //     }
    // }
    addRouter(router) { // надо проитерироваться по всем эндпоинтам плучить пути методы и для каждого эндпоинта подписаться на событие
        Object.keys(router.endpoints).forEach(path => { 
            // с помощью Object.keys получаем ключи у эндпоинтов роутера ключом являтся путь сам маршрут
            const endpoint = router.endpoints[path]; // выцепляем соответствующий эндпоинт для удобства 
            // если получим ключи у эндпоинта это будут уже методы
            Object.keys(endpoint).forEach((method) => { // получаем ключи Object.keys(endpoint) с помощью forEach по этим ключам итерируемся
                this.emitter.on(this._getRouteMask(path, method), (req, res) => { // подписываемся на событие
                    const handler = endpoint[method];  // получаем соответсвующий handler из эндпоинта по методу
                    // перед вызвом handler каторый обрабатывает запрос надо пройтись по массиву middleware и вызвать каждый middleware
                    // this.middleware.forEach(middleware => middleware(req, res)) // теперь middleware будем вызывать перед генерацией события
                    handler(req, res) // после взываем непосредственно handler
                })
            })
        })
    } // получили некаорый роутер проитерировались по всем эндпоинтам для каждого эндпоина создали событие и это событие генерируем 
    // внутри функции _createServer
    
    _createServer() { // отдельный метод для создания сервера названия начинается с _ тоесть метод приватный использовать с наружи нестоит
        return http.createServer((req, res) => {
            // событие в классе в методе request создали подписались на него emitter.on(`[${path}]:[${method}]`
            // генерировать событие будем при создании сервера 
            // когда событие создавали в колбеке ожидает 2 аргумента (req, res) и сдесь когда событие эммитем надо эти параметры передать
            // emitter.emit(`[${req.url}]:[${req.method}]`, req, res) // вызываем функцию emit и по маске `[${path}]:[${method}]` событие эммитем
            // обработаем ситуацию когда пользователь отправил запрос на несуществующий адрес

            // так как тело запроса может быть большое и мы его склеиваем покусочкам надо эти кусочки куда то добовлять для этого сделаем переменную
            let body = "";
            // отправляем пост запрос с объектом JSON и получаем пустой ответ тело undefined дело в том что req это Readable stream и для того что бы 
            // получить тело запроса надо с помощью стрима его прочитать
            req.on('data', (chunk) => { // подпичываемся на событие data передаем колбек он принмает chunk кусочек тела запроса
                // console.log(chunk);
                body += chunk; // чанки будем приплюсовывать к этой переменной
            })
            // отправляем запрос еще раз и плучаем в логи буфер тело запроса

            // после того как прочитали все тело запроса отрабатывает событие end повесим слушатель на это событие
            req.on('end', () => {
                if(body) {  // если тело запроса не пустое то добовляем его к реквесту
                    req.body = JSON.parse(body); // но перед этим преобразуем тело запроса в JS объект функция JSON.parse
                } // теперь получаем объект а не undefined
                // только после тогда как закончили читать тел запроса эммитем событие 
                // const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res);
                this.middleware.forEach(middleware => middleware(req, res)) 
                // теперь middleware будем вызывать перед генерацией события что бы req.pathname был уже доступен
                // console.log(req.pathname)
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);

                if (!emitted) { // когда эмитим событие возврощается булинове значение оно = false если такова событи несуществует
                    res.end();  // закрываем стрим если такова событи несуществует что бы запрос не весел бесконечно
                }
            })

            // const emitted = this.emitter.emit(`[${req.url}]:[${req.method}]`, req, res); получаем маску из метода _getRouteMask
            // const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res);

            // if (!emitted) { // когда эмитим событие возврощается булинове значение оно = false если такова событи несуществует
            //     res.end();  // закрываем стрим если такова событи несуществует что бы запрос не весел бесконечно
            // }
        })
    }

    // получение маски [${req.url}]:[${req.method}] вынесем в отдельный метод так как используем ее в 2 местах
    // при инициализации события и при эммите этого события
    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}