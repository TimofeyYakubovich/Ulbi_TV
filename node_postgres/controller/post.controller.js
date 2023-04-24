const db = require('../db')

class PostController {
    async createPost(req, res) {
        const {title, content, user_id} = req.body
        const newPerson = await db.query('INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *', [title, content, user_id])
        res.json(newPerson.rows[0]);
    }

    async getPostByUser(req, res) {
        const id = req.query.id;
        const post = await db.query('SELECT * FROM post where user_id = $1', [id]);
        res.json(post.rows);
    }
}

module.exports = new PostController();