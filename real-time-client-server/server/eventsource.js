const express = require('express')
const cors = require('cors')

const events = require('events')
const emitter = new events.EventEmitter()

const PORT = 5000;

const app = express()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    // для того что бы event sourcing работал над указать заголовки
    res.writeHead(200, { // 1 аргументом указываем сатус код 2 заголовки
        'Connection': 'keep-alive',  // держать подключение
        'Content-Type': 'text/event-stream', // самый важный заголовок text/event-stream строковый формат обмена данными
        'Cache-Control': 'no-cache',  // что бы ничего не кешировалось
    })
    // по аналгии с LongPulling подписываемся на собыие но не через once а on оно может отрабатывать неограниченое количество раз
    // так как соединение сдесь бескнечное
    emitter.on('newMessage', (message) => {
        // сообщение с помощью функции write возвращаем на клиент
        // после отправки сообщения получаем ошибку дело в том что в теле ответа когда сервер возвращает ответ уведомляет о том что сообщение 
        // отправлено мы пытаемся записать объект message в сдесь мы можем записывать только строковые значения
        // res.write(message)
        // завернем объект в ``
        // res.write(`${message}`) // теперь отправляется статус код успешный но в логах ничего нет
        // потому что сообщения должны отправляться по определенному шаблону
        // перед самим сообщением прописываем data: саму строку заканчиваем 2 символами переноса строки \n\n
        // и само сообщение перегоняем в json строку
        res.write(`data: ${JSON.stringify(message)} \n\n`) // теперь в логах получаем json строку остается ее распарсить в объект и дбавить
                                                           // в состояние
    })
})

app.post('/new-messages', (req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200)
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))