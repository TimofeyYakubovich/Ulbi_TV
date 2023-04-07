// сделаем middleware каторый будет парсить JSON и проставлять загоовки
module.exports = (req, res) => { // экспортруем функцию сам мидлвеер принимает req, res и функцию next каторая по цепочке вызывает следующий 
    // мидлвеер но щас такова делать не будем у нас будут вызываться все мидлвееры
    res.send = (data) => { // метод send будет предназначен для того чт бы передать данные в формате JSON и с нужным заголовком
        res.writeHead(200, { // дбовляем заголовок метод writeHead 1 аргумент статус код 200
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(data))
    }
}