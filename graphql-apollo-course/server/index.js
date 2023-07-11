// npm i express graphql express-graphql cors nodemon
// express-graphql для связки express и graphql
const express = require('express')
//  импортируем graphqlHTTP из пакета express-graphql
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./shema')

// в реальном приложении все данные хронятся в бд что бы не подключаться к бд этот процесс съэмитируе
// создадим массив с него будем все данные получать и и в него дбовлять
const users = [{id: 1, username: "Vasya", age: 25}]

const app = express()
app.use(cors())


const createUser = (input) => { // сделаем функцию что бы код был покрасивее в createUser:
    const id = Date.now() // генерируем id что бы был уникаьным из текущей даты
    return { // возвращаем объект с id и разворачиваем input в нем поля username: String! age: Int! posts: [PostInput]
        id, ...input
    }
}



// используем функции 
// создаем объект root так называемый резолвер. Резолверы — это функции, которые запускаются каждый раз, когда запрос запрашивает поле
// в нем будем создавать функции каторые будут возвращать какие то данные одноименно с теми каторые указаны в типе Query
const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(usert => usert.id == id)
    },
    createUser: ({input}) => {
        const user = createUser(input) // создаем пользователя функцией createUser передаем параметром input
        users.push(user)  // добовляем пользователя в массив
        return user
    }
} // передаем резолвер в graphqlHTTP в поле rootValue

app.use('/graphql', graphqlHTTP({ // 1 параметром передам URL обезаельно /graphql 2 graphqlHTTP каторый принмает объект где указываем graphql: true
    graphiql: true, // graphql: true включает графический интерфейс в браузере что бы сразу тестировать и отправлять запросы в браузере
    schema,          // передаем схему
    rootValue: root
}))

app.listen(5000, () => console.log('server started on port 5000'))