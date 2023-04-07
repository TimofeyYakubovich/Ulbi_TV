// работа с файловой системой 
// взаимодействие с файловой системой создание файлов папок удаление считыание записывание
// для заимодействия с файловой системой есть стандартный модуль fs
const { rejects } = require('assert');
const { count } = require('console');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()

// const fsPromise = require('fs/promises')
// у fs есть большое количество методов есть обычные методы и его синхронные варианты 

// начнем с синхронного варианта 
// функция mkdirSync позволяет создать папку
// 1 аргумент путь к дериктории в каторой будет создана папка используем resolve предаем туда __dirname и папку dir

// fs.mkdirSync(path.resolve(__dirname, 'dir')) // после запуска в папку lessons пояляется папка dir

// при попытке запустить приложение еще раз получаем ошибку потому что такая папка уже существует


// если надо создать несколько вложенных папок
// поумолчанию node.js рекурсивно создавать папки не может для этого 2 аргумент передаем объект {recursive: true}
// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true})


// с асинхронными функциями работаем немного подругому с помощью событийноориентированной модели колбеков функций обратного вызова
// 1 аргуентом указываем путь 2 передаем колбек
// чаще всего подобные колбеки 1 аргументом принимают ошибку ее можно обработать
// что бы убедиться что функция выполняется асинхронно перед функцией напишем START после END
// если функция асинхронная сначала выведется START потом END и только после того как папка будет создана 'Папка создана'
// запускаем приложение и получаем START END и собщение о ошибке и Папка создана потому что node.js рекурсивно создавать папки не может
// без соответствующей опции а ашибку мы вивели в логи но не завершили выполнение колбека и он пошел дальше
// запускаем получаем START END Папка создана потому что функция выполнилась в асинхронном режиме

// console.log('START')

// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//     if(err) {     // проверяем если ошибка есть выведем ее в логи
//         console.log(err)
//         return;
//     }
//     console.log('Папка создана')
// })

// console.log('END')

// удаление папок функция rmdir
// 1 аргуентом указываем путь 2 передаем колбек катоырй принмает ошибку каторую надо обработать
// пробрсим на уровент выше и обработает в throw catch
// запускаем и папака dir удаляется

// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if(err) {
//         throw err;
//     }
// })

// создание файла и записьв него данных функция writeFile
// 1 аргуентом указываем путь 2 Это буфер данные каторые мы хотим положить в файл в данном случае строка 3 аргумент колбек
// запускаем и в папке lessons появился файлик test.txt с тестом 5 erg 7 9 10 retetg
// функция writeFile записывает данные в файлл но если там что то было записано она их перезапишет

// fs.writeFile(path.resolve(__dirname, 'test.txt'), '5 erg 7 9 10 retetg 52365236', (err) => {
//     if(err) {
//         throw err;
//     }
//     console.log('файл записан')
// })

// функция appendFile дозаписывает даные в файл принимает те же аргументы что и writeFile
// запускаем и в папке lessons появился файлик test.txt с тестом 5 erg 7 9 10 retetg дописался текст ДОБАВИЛИ В КОНЕЦ

// fs.appendFile(path.resolve(__dirname, 'test.txt'), 'ДОБАВИЛИ В КОНЕЦ', (err) => {
//     if(err) {
//         throw err;
//     }
//     console.log('файл записан')
// })

// сейчас такая реализация что непонятно какая из этих функций выполнится быстрее так как они обе аснихронные
// что бы они выполнились поочереди надо одну функцию поместить в другую что бы гарантровать что текст 'ДОБАВИЛИ В КОНЕЦ' добавится в конце
// и файл будет создан
// допустим после того как мы записали что то в конец файла нода выполнить еще какую то асинхрнную операцию 
// таким образом получается ад коюлеков когда одну функцию вкладываем в другую третью четвертую и получается нечитабелный код

// fs.writeFile(path.resolve(__dirname, 'test.txt'), '5 erg 7 9 10 retetg 52365236', (err) => {
//     if(err) {
//         throw err;
//     }
//     console.log('файл записан')

//     fs.appendFile(path.resolve(__dirname, 'test.txt'), 'ДОБАВИЛИ В КОНЕЦ', (err) => {
//         if(err) {
//             throw err;
//         }
//         fs.appendFile(path.resolve(__dirname, 'test.txt'), 'ДОБАВИЛИ В КОНЕЦ', (err) => {
//             if(err) {
//                 throw err;
//             }
//             console.log('файл записан')
//         })
//     })
// })


// что бы это исправить используют промисы
// в node.js есть возможность работать с файловой системой с помощью промисов для этого импортируется const fsPromise = require('fs/promises')
// но расмотрим как предыдущую реализацию написать на промисах

// реализуем свой вариант функции для записи файла на диск с использованием промисов

const writeFileAsync = async (path, data) => { // создаем функцию и созадем промис
    // промис при создании аргументом принимает колбек каторый аргумент приниает функцию resolve если промис выполнился успешно
    // и функцию reject если функция выплнилась с ошибкой
    // после чего выполняем функцию writeFile из стандартного модуля node.js указываем ей пути и передаем ей колбек в катором обрабатываем ошибку
    // и вот сделсь уже если вознкла ошибка вызывается reject и туда можно прокинуть текст ошибки
    // если ошибка не произошла вызываем функцию resolve
    // похорешому путь и данные передавать аргументами
    // return new Promise ((resolve, reject) => fs.writeFile(path.resolve(__dirname, 'test.txt'), 'data', (err) => {
    return new Promise ((resolve, reject) => fs.writeFile(path, data, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

// тожесамое сделаем для appendFile 2 аргументом запишим данные каторые хтим дозаписать в файл

const appendFileAsync = async (path, data) => { 
    // return new Promise ((resolve, reject) => fs.appendFile(path.resolve(__dirname, 'test.txt'), '123', (err) => {
    return new Promise ((resolve, reject) => fs.appendFile(path, data, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'data ') // взываем функцию writeFileAsync передаем путь и данные каторые надо записать
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '213 ')) // после чего так как это промис с помощью then вызываем appendFileAsync дозаписываем данные
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '43252 '))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '5322 '))
//     .then(() => readFileAsync(path.resolve(__dirname, 'test.txt'))) // считываем записаные данные в 'test.txt'
//     .then(data => console.log(data)) // получаем считанные файлы как data и выводи в console.log(data)
//     .catch(err => console.log('err'))
// такой код намного читабельнее чем с помощью колбеков
// если возникнет ошибка она выводится в логи и прописана она только в одном месте


// так же есь целый раяд различных методов каорые позволяют изменять доступ, чиать файл, открывать, копировать, перемещать файлы

// что бы считывать файлы есть функция fs.readFile
// 1 аргументом принимает путь 
// 2 поумолчанию считывает буфер но если надо получить строкук в какой то кодировке уазываем 2 аргуентом объект
// передаем объект {encoding: 'utf-8'} encoding это кодировка смая распространненая
// колбек кароме ошибки принимает 2 аргкмент типа стринг или буфер Это те данные каторые прочитаются с файла
// передаем в resolve(data) что бы можно было получить их с помощью .then

const readFileAsync = async (path) => { 
    // return new Promise ((resolve, reject) => fs.appendFile(path.resolve(__dirname, 'test.txt'), '123', (err) => {
    return new Promise ((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if(err) {
            return reject(err.message)
        }
        resolve(data)
    }))
}

// что бы удалять файлы есть функция fs.rm и удлять папку fs.rmdir
// 1 аргументом принимает путь 
// колбек принимает только ошибку

const removeFileAsync = async (path) => { 
    // return new Promise ((resolve, reject) => fs.appendFile(path.resolve(__dirname, 'test.txt'), '123', (err) => {
    return new Promise ((resolve, reject) => fs.rm(path, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

// removeFileAsync(path.resolve(__dirname, 'test.txt'))
//     .then(() => console.log('file was removed'))
// запускаем кд и файл test.txt удаляется 

// задачка через переменную окружения мы передаем строку записываем ее в файл 
// этот файл считываем считаем количество слов в этой файле и записываем их уже в другой файл при этом 1 файл удаляем

const text = process.env.TEXT || ''; // получаем переменную из переменных окружения если переменная не указана то будет пустая строка

writeFileAsync(path.resolve(__dirname, 'text.txt'), text) // создаем файл с помощью функции writeFileAsync, с помощью path.resolve
// уазываем путь, в качестве данных для записи в файл передае то что получили из переменных окружения
    .then(() => readFileAsync(path.resolve(__dirname, 'text.txt'))) // считываем содержимое файла text.txt соответственно путь к файлу тот же
    .then(data => data.split(' ').length) // в data передаем строку прочитаную с файла, что бы посчитать количество слов на data вызываем метод
    // splt(' ') передаем туда пробел получаем массив и количесвто элиментов в этом массиве и будет количесво слов
    .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `количество слов ${count}`)) // в count передается количесвто элиментов массиве
    // функцией writeFileAsync создаем файл count.txt и записываем в него `количество слов ${count}`)
    .then(() => removeFileAsync(path.resolve(__dirname, 'text.txt')))
    // запускаем код сразу указываем переенную окружения cross-env TEXT="1 2 3 4 5 6 7 hhhtjt" node .\lessons\file-system.js