const {Schema, model} = require('mongoose')

const User = new Schema ({
    username: {type: String, unique: true, required: true}, //  unique: true униклаьное поле так как не может быть 2 User с одинаковым username
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}] // у каждого пользователя в бд будет массив ролей roles 
    // ref: 'Role' указываем ссылку на сущность Role тоесть каждая roles у User будет ссылаться на другую сущность Role
})

module.exports = model('User', User)