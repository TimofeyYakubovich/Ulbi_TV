const db = require('../db') // импортируем сюда Pool с помощью него будем писать sql запросы к бд

class UserController {
    async createUser (req, res) {
        const {name, surname} = req.body
        // console.log(name, surname)
        // создаем пользователя вызывае функцию db.query в каторой напрямую пишем sql запрос
        // что бы добавить пользовотеля INSERT INTO, назване таблицы в каторую надо добавить person, поля аторые хотим добавить (name, surname)
        // values ($1, $2) вместо $1, $2 будут подставляться значения из массива, RETURNING значит после создания функция вернет пользователя
        // 2 параметром [name, surname] каторые будут подставлены соответсвенно в values ($1, $2)
        const newPerson = await db.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname])
        // res.json('ok')
        res.json(newPerson.rows[0]);
    }

    async getUser (req, res) {
        // SELECT * FROM person получить все * данные из ьаблицы person
        const users = await db.query('SELECT * FROM person');
        res.json(users.rows);
    }

    async getOneUser (req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM person where id = $1', [id]);
        res.json(user.rows[0]);
    }

    async updateUser (req, res) {
        const {id, name, surname} = req.body;
        // UPDATE для обнавления данных в табблице затем название таблицы псоле SET потом поле каторое нао изменить и какое то условие его id
        // если не указывать условие будут изменены все сущесвтующую записи в таблице
        // так как функция UPDATE ничего не возвращает пишем RETURNING * что бы получить уже изменненого пользователя
        const user = await db.query('UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id])
        res.json(user.rows[0]);
    }

    async deleteUser (req, res) {
        const id = req.params.id;
        // DELETE что бы удалять данные из таблици если указывать без условия удаляться все данные 
        const user = await db.query('DELETE FROM person where id = $1', [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new UserController();