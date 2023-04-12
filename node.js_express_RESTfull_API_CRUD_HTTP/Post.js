// РАботать будем с постами у каторых будет заголовок, контентная часть и картинка
// сдесь опишем модель данных этого поста
import mongoose from "mongoose";

const Post = new mongoose.Schema({ // создаим схему в каторой описано какие поля и какова типа будут у поста
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    picture: {type: String} // хронить все изображение в базе данных не очень разумно будем хранить только его название
})

export default mongoose.model('Post', Post) // экспортируем из этого файла модель 'Post' и эта модель будет построена на основании схемы Post