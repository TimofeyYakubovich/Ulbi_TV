// сконфигурируем бд

// достаем Pool это класс из пакета pg
const Pool = require('pg').Pool
const pool = new Pool({
    // в конструктор передаем объект с настройками
    user: "postgres",
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: "node_postgres"
});


module.exports = pool


