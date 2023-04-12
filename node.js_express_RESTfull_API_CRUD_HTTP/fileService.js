// отдельный сервис для файлов логика для сохраниения файлов в БД
// сдесь можно написать несколько функций для записи файла на диск для удаления получения обработки

import * as uuid from 'uuid';
import * as path from 'path'; // стандартный node.js модуль для работы с путями

class fileService {
    saveFile(file) { // функция полученый праметром файл будет сохронять на диск
        try {
            // что бы каждый файл имел униальное название надо его как то сгенерировать в npm есть пакет npm i uuid генерирует уникальные id
            const fileName = uuid.v4() + '.jpg'; // к с генерированному id доболяем .jpg
            // функция path.resolve берет текущую дерикторию и добавляет к ней папку каторая указана 1 аргументом
            // 2 аргуентома передаем названиеи файла
            const filePath = path.resolve('static', fileName)
            file.mv(filePath); // перемещаем file по пути filePath
            return fileName;
        } catch {
            console.log(e)
        }
    }
}

export default new fileService();