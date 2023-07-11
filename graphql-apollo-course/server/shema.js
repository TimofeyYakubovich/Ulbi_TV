// импортируем функцию buildSchema
const {buildSchema} = require('graphql')

// buildSchema параметром принимает строку
// описываем тип пользователя и в {} поля каторые будут у этого типа posts: [Post] где каждый Post является тоже типом

// опишим запросы и мутации в схеме
// мутации предназначены что бы создавать новые объекты или их изменять и мутации должны принимать параметром эти бъекты
// для них используется специалный тип input
// в нашем случае input будет содержать те же поля что и User но ! знаком можно пометить обезательные поля

// опишем тип запроса 
// грубо говоря внутри будет несколько функций 
// getAllUsers: [User] будет возвращать всех пользователей массив каждый элимент каторого является типом User
// getUser(id: ID): User будет возвращать конкретного пользователя параметром принимает id типа ID и возвращяет объект типа User

// создадим муации Mutation что бы пользователей в эмитированную бд добовлять
// запрос createUser параметром принимает тот input типа UserInput и после того как мутация выполнится будет возвращаться пользователь : User
// каторый был создан

const schema = buildSchema(`

    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    type Post {
        id: ID
        title: String
        content: String
    }

    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }
    input PostInput {
        id: ID
        title: String!
        content: String!
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    type Mutation {
        createUser(input: UserInput): User
    }

`)

module.exports = schema