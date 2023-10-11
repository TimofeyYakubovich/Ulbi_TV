// сервис для работы только с файлами 
// nest generate module files  nest generate service files контроллер сдесь не нужен так как этот сервис будет использоваться внутри других
// конроллеров и сервисов
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as fs from 'fs' // стандартный модуль Node.js для работы с файламиы
import * as path from 'path' // и для работы с путями
// что бы генерировать рандомные назания для файлов npm i uuid
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        // оборачиваем все в try catch так как при записе на диск могут возникнуть ошибки
        try {
            const fileName = uuid.v4() + '.jpg' // генерируем уникальное название для файла
            // далее надо получить путь к этому файлу
            // получаем текущую папку с попомщью __dirname возвращаемся на одну '..' так как сейчас находимся в папке files
            // и затем заходим в папку static функция resolve все это склеит в нормальный путь
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) { // если по этому пути ничего не существует до создаем папку функцией mkdirSync
                 // 1 параметр путь 2 опция recursive: true тоесть ели какой то папки в этом пути не будет то Node.js ее создаст
                fs.mkdirSync(filePath, {recursive: true})
            }
            // после того как убедились чо папку по такому пути существует то записываем туда файл
            // функцией path.join склеиваем путь с название файла
            // и по итогу файл запишется в файловую систему
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName // из этой функции возвращаем название файла
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
