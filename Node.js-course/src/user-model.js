// user-model сдесь будем описывать схему того как user будет храниться в нашей базе данных
const mongoose = require('mongoose'); // импортруем mongoose

const userSchema = new mongoose.Schema({ // пример как создается схема
    name: String,
    password: String
});

// из этого файла надо экспортировать модель каторая построена на основе схемы 
// у mongoose есть функция model 1 аргументом передаем название модели 2 аргументом схему
module.exports = mongoose.model('User', userSchema)