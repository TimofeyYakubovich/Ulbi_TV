// npm i mongodb устанавливаем монгодб

// импортируем монго клиент из пакета монгодб
const {MongoClient} = require('mongodb')

// создаем объект клиента и параметром в конструктор передаем юрл что бы сконектиться с бд
const client = new MongoClient('mongodb+srv://user:user@cluster0.rqjlnlm.mongodb.net/?retryWrites=true&w=majority') 

const start = async () => {
    try {
        await client.connect();
        console.log('соединение установлено')
        //взаимодействие с бд с точно таким же синтаксисом 
        await client.db().createCollection("users")
        const users = client.db().collection('users') // вынесем коллекцию users в отдельную переменную
        await users.insertOne({name: 'ulbi TV', age: 25})
        const user = await users.findOne({name: 'ulbi TV'}) // получае пользователя и передаем его в переменную
        console.log(user)
    } catch (e) {
        console.log(e)
    }
}

start();