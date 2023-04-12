// сдесь будем описывать логику маршрута posts
import Post from "./Post.js";
import PostService from "./PostService.js";

class PostController {
    async create (req, res) { // функция каторая будет пост создавать
        try {
            // const {author, title, content, picture} = req.body;
            // const post = await Post.create({author, title, content, picture})
            // console.log(req.files) // выведем файл полученый с постмана с запроса в логи
            // передаем 2 аргументом в PostService.create
            const post = await PostService.create(req.body, req.files.picture) // теперь используем метод из сервиса сразу передаем в него тело запроса
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    // создадим функции для каждого маршрута
    async getAll (req, res) {
        try {
            // const posts = await Post.find() // что бы получить все объекты у модели данных Post вызываем функцию find если не указывать ей ничего
            // она вернет все посты с базы данных
            const posts = await PostService.getAll()
            return res.json(posts); // возвращаем posts на клиент
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne (req, res) {
        try {
            // const {id} = req.params;
            // if (!id) {
            //     res.status(400).json({message: 'Id не указан'})
            // }
            // const post = await Post.findById(id) // findById найдет с БД 1 пост с нужным id
            const post = await PostService.getOne(req.params.id)
            return res.json(post);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update (req, res) {
        try {
            // подразумевается в теле запроса будет приходить пост с уже обнавленными полями
            // const post = req.body;
            // if (!post._id) {
            //     res.status(400).json({message: 'Id не указан'})
            // }
            // функция findByIdAndUpdate обновит post и обнавленная версия вернется 
            // 1 аргумент id 2 аргумент сам post 3 аргумент опция {new: true} что бы нам вернулась обнавленная версия поста
            // const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
            const updatedPost = await PostService.update(req.body)
            return res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e.message) // e.message что бы получать именно сообщение о ошибке а не пустой объект
        }
    }

    async delete (req, res) {
        try {
            // const {id} = req.params;
            // if (!id) {
            //     res.status(400).json({message: 'Id не указан'})
            // }
            // const post = await Post.findByIdAndDelete(id);
            const post = await PostService.delete(req.params.id)
            return res.json(post);
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController(); // эеспортируем объект созданый из класса PostController