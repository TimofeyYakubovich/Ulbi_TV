// создадим провайдер
import { Injectable } from "@nestjs/common";
// что бы этот класс стал провайдером надо пометить его анотацией Injectable так как в дальнейшем этот сервис будем внедрять в контроллер
// тоесть делать инъекцию
@Injectable()
export class AppService {
    // внутри сервиса реализуем функцию каторая бдует возвращать пользователей
    // например эта функция обращается к бд как то валидирует данные и тд. и всю логику можно вынести в этот сервис
    // контроллер должен оставаться максимально простым не содержать лишнию логику просто принимать какой то запрос и возвращать какой то ответ
    getUsers() {
        return [{id: 1, name: 'Ulbi tv'}]
    }
}