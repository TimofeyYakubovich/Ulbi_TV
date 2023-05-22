const {Schema, model} = require('mongoose')

const Role = new Schema ({
    // схемаа для роли сдесь будет хрониться юзер админ модератор менеджер и тд.
    value: {type: String, unique: true, default: "USER"}
})

module.exports = model('Role', Role)