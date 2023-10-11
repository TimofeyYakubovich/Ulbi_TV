// пайпы в Nest js
// папйпы имеют 2 основных предназначения
// 1 как то преабразовывать входные данные например строку переводить в число
// 2 валидация входных данных

import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

// реализуем пайп для валидации данных
// устанавливаем npm i class-validator class-transformer
// импортируем тип ArgumentMetadata
// как и все остально это будет класс он будет имплементировать интерфейс PipeTransform
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        // получаем объект каторый будем валидировать это тело запроса, функция plainToClass будет преобразовываь значения в нужный для нас класс
        const obj = plainToClass(metadata.metatype, value)
        // далее с помощью функции validate из class-validator получае мошибки каторые вернутся после валидации полученного объекта
        const errors = await validate(obj)
        // если массив ошибок имеет какую то длину то делаем преобразования
        if (errors.length) {
            // console.log(errors)
            // если мы попали в это условие то в массиве errors есть объекты с ошибками это либо неправильная длина пароля либо неправильно 
            // указанный емаил проходимся по массиву мепом и преобразвываем объекты к строке 
            let messages = errors.map(err => {
                // поле property это название поля катрое не прошло валидацию email или password
                // далее через дифис получаем значения из поля constraints это те сообщения каторые указывали в dto
                // и join склеиваем их в строку через ,
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`  
            })

            // выбрасывем кастомную ошибку ValidationException параметром в него будем передавать сообщение
            throw new ValidationException(messages)
        }
        return value;
    }
}