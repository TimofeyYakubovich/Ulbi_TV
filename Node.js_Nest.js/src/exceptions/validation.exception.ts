import { HttpException, HttpStatus } from "@nestjs/common";

// кастомная ошибка класс каторый будет наследоваться от 
// добавляем в него еще 1 поле messages;
export class ValidationException extends HttpException {
    messages;

    constructor(response) { // constructor будет принимать параметром response так же как и HttpException
        super(response, HttpStatus.BAD_REQUEST);  // вызываем родительский constructor функцией super передаем туда  
        this.messages = response // в поле messages присваиваем то что пришло в response
    }

}