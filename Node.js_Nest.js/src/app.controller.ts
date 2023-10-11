// создадим контроллер

import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AppService } from "./app.Service";

// помечаем класс AppController декоратором Controller параметром этот декоратор принимает префикс по катрому этот контроллер будет отрабатывать
@Controller('/api')  
export class AppController {
    // что бы использовать сервис внутри контроллера надо сделать инъекцию Dependency Injections
    constructor(private appService: AppService) { // в конструктор добовляем appService и помечаем что он типа AppService
                                                  // таким образом не надо создавать объект из этого класса мы им просто пользуемся
                                                  // за создание отвечает nest
    }


    // создадим функцию каторая будет возвращать массив каких то объектов
    // что бы эта функция стала ендпоинтом и можно было к ней достучаться http запросом надо пометить ее декаратором @Get @Post @Put @Delete
    @Get('/users') // параметром уазываем путь до этого ендпоинта
    getUsers() {
        // return [{id: 1, name: 'Ulbi tv'}]
        return this.appService.getUsers()
    }
}