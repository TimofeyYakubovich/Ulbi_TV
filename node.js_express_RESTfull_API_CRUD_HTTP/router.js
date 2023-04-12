// сдесь будем описываь все маршруты

import Router from "express"; // импортируем Router из express
// import Post from './Post.js';
import PostController from "./PostController.js";

const router = new Router; // создаем экземпляр роутера
// теперь у router можем вызывать теже функции get post PUT DELETE и тд.
// 1 аргумент передаем машрут эндпоинта 2 аргумент функция каторая будет отрабатывать по конкретному маршруту

router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)  // получения всех постов
router.get('/posts/:id', PostController.getOne) // получение конкретного поста
router.put('/posts', PostController.update)  // обновление поста
router.delete('/posts/:id', PostController.delete)  // удаление поста

// в приложении таких файлов роутеров может быть несколько этот конкретно для постов

export default router;