// слои абстракции
// суть в том что бы разделять логические куски приложения на отдельные модули 
// тким образом получается слабая связанность кода и можно затем один из кусков полностью переписать не затронув другие

// например есть слой DAL (data access layer) Слой доступа к данным в нашем случае за этот слой можно принять mongoose так как все операции 
// с базой данных делаем с помощью него
// если бы сами описывали SQL запросы то было бы разумно выделить эту логику по обращению к базе данных в отдельный модуль

// слой Controller Работа с клиент-серверной составляющей (params, body, headers....) и из контроллера возвращаем ответ на клиент и статус код

// слой Service Бизнес - логика никак не связана с req/res Работа с бд и входными параметрами
// в сервисе описана логика получить данные из БД както с ними поработать что то высчетать и вернуть а куда ты это возвращаешь уже не важно
// например если решили поменять фреймворк то переписываться будут маршруты конроллер но Бизнес - логика не поменяется

import Post from "./Post.js";
import fileService from "./fileService.js";

class PostService {
    // копируем сюда все функции из контроллера но с req, res сдесь уже не работаем только с БД
    async create (post, picture) {
            const fileName = fileService.saveFile(picture) // saveFile возвращает название файла записываем его в переменную fileName
            // и это имя файла надо передать в Post.create и сохронить в бд
            // const createdPost = await Post.create(post)
            const createdPost = await Post.create({...post, picture: fileName}) // разворачиваем объект post и добовляем к нему новое поле picture
            return createdPost;
        
    }
    // создадим функции для каждого маршрута
    async getAll () {
            const posts = await Post.find()
            return posts;
    }

    async getOne (id) {
        if (!id) {
            throw new Error('Id не указан')
        }
        const post = await Post.findById(id)
        return post;
    }

    async update (post) {
        if (!post._id) {
            throw new Error('Id не указан')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return updatedPost;
    }

    async delete (id) {
        if (!id) {
            throw new Error('Id не указан')
        }
        const post = await Post.findByIdAndDelete(id);
        return post;
    }
}

export default new PostService(); // эеспортируем объект созданый из класса PostService