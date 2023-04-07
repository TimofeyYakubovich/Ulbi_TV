// стандартный модуль path каторые позволяет взаимодействовать с путями обсалютными или относительными
const path = require('path')
// у объекта path есть целый ряд методов
// console.log(path.join('first', 'second')) // самы часто используемы метод join позволяет склеить несколько участков пути 
// в логи выдает first\second
console.log(path.join('first', 'second', 'third'))
// в логи выдает first\second\third добовляет \ между аргументами
// const fullpath = 'first\second\third' // можно было бы просто склеить вручную то на разных ОС эти сепораторы / разные / \ и тд.
// join склеивает пути независимо от ОС на каторой запускается node.js приложение

// так же в node.js есть 2 глобальные переменные __dirname __filename

// __dirname это страка каторая содержит путь к текущей дирекории
console.log('склеить участи пути', path.join(__dirname, 'first', 'second', 'third'))
// склеить участи пути C:\Users\yakub\OneDrive\Рабочий стол\Node.js\lessons\first\second\third
// __dirname выдает на любом устройстве путь от корня до дирекории в каорой мы используем эту глобальную переменную
console.log('склеить участи пути', path.join(__dirname, '..', '..'))
// если надо вернуться на 1 уровень влоденностей папок назад можно использовать '..'
// склеить участи пути C:\Users\yakub\OneDrive\Рабочий стол


// функция resolve всегда возвращает обсалютный путь эта функция работает менее предсказуемым образом
console.log('Получить обсалютный путь', path.resolve('first', 'second', 'third'))
// Получить обсалютный путь C:\Users\yakub\OneDrive\Рабочий стол\Node.js\first\second\third 
console.log('Получить обсалютный путь', path.resolve('/first', '/second', '/third'))
// Получить обсалютный путь C:\third  
console.log('Получить обсалютный путь', path.resolve('/first', 'second', 'third'))
// Получить обсалютный путь C:\first\second\third
console.log('Получить обсалютный путь', path.resolve(__dirname, 'first', 'second', 'third'))
// Получить обсалютный путь C:\Users\yakub\OneDrive\Рабочий стол\Node.js\lessons\first\second\third

// так же есть возможно любой путь проспарсить
const fullpath = path.resolve(__dirname, 'first', 'second', 'third'); // вынесем получившийся путь в переменную
console.log('Парсинг пути', path.parse(fullpath)) // с помощью функции parse можно распарсить путь
// получаем объект
// Парсинг пути {
//     root: 'C:\\',
//     dir: 'C:\\Users\\yakub\\OneDrive\\Рабочий стол\\Node.js\\lessons\\first\\second',
//     base: 'third',
//     ext: '',
//     name: 'third'
// }
const fullpath1 = path.resolve(__dirname, 'first', 'second', 'third.js'); // вынесем получившийся путь в переменную
console.log('Парсинг пути', path.parse(fullpath1))
// Парсинг пути {
//     root: 'C:\\',
//     dir: 'C:\\Users\\yakub\\OneDrive\\Рабочий стол\\Node.js\\lessons\\first\\second',
//     base: 'third.js',
//     ext: '.js',
//     name: 'third'
//   }

// есь еще целый ряд свойств
console.log('разделитель в ОС', path.sep) // разделитель в ОС \
console.log('Проверка на обсалютный путь', path.isAbsolute(fullpath)) // Проверка на обсалютный путь true
console.log('Проверка на обсалютный путь', path.isAbsolute('first\second')) // Проверка на обсалютный путь false
console.log('Название файла', path.basename(fullpath1))  // Название файла third.js
console.log('Расширение файла', path.extname(fullpath1))  // Расширение файла .js

// работа с URL 

const siteURL = 'http://localhost:8080/user?id=5123'
// допустим на воходе есь строка URL siteURL и надо эту строку распарсить получить Query-параметры, получить участки пути
// для этого предназанчен глобально доступный класс URL

const url = new URL(siteURL); // при создании объекта url в конструктор передаем siteURL

console.log(url) // у созданого объекта есть целый ряд плей и методов с каторыми можо работать
// URL {
//     href: 'http://localhost:8080/user?id=5123',
//     origin: 'http://localhost:8080',
//     protocol: 'http:',
//     username: '',
//     password: '',
//     host: 'localhost:8080',
//     hostname: 'localhost',
//     port: '8080',
//     pathname: '/user',
//     search: '?id=5123',
//     searchParams: URLSearchParams { 'id' => '5123' },
//     hash: ''
//   }