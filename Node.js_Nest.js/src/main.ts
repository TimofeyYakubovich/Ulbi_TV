// npm i -g @nestjs/cli
// nest new .  
// main.ts точка входа в приложение
// npm run start:dev

// npm install --save @nestjs/sequelize sequelize sequelize-typescript
// npm install --save pg pg-hstore
// npm install --save-dev @types/sequelize
// npm i @nestjs/config

// npm i @nestjs/swagger swagger-ui-express

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "./pipes/validation.pipe";


async function start() { // функция start будет запускать приложение
    const PORT = process.env.PORT || 5000;
    // с помощью NestFactory создаем экземпляр приложения вызываем функцию create в нее надо передать модуль AppModule
    const app = await NestFactory.create(AppModule) 

    // что бы документировать REST API устанавливаем npm i @nestjs/swagger и swagger-ui-express для графического представления документации
    // настроим swagger принициализируем переменную config с помощью DocumentBuilder это такой патерн каторый позволяет постипенно для объекта 
    // задавать какие то параметры поля
    const config = new DocumentBuilder()
        .setTitle('урок по продвинотому BACKEND') // названиеи приложения
        .setDescription('Документация REST API')  // описание
        .setVersion('1.0.0') // версия проекта она может инкрементироваться
        .addTag('Ulbi Tv') // добавим какой нибудь тег
        .build() // собирааем из этого всего объект
    // создадим объект самой документации обращаемся к SwaggerModule и у него вызываем функцию createDocument
    // 1 параметром передаем инстанс приложения 2 параметром config
    const document = SwaggerModule.createDocument(app, config)
    // далее у SwaggerModule вызываем функцию setup передаем префикс по каторому сможем открыть документацию в браузере, инстанс приложения 
    // и document
    SwaggerModule.setup('/api/docs', app, document)

    //app.useGlobalGuards(JwtAuthGuard) // что бы ограничеть дступ до всех ендпоинтов в приложении тоесть только для авторизованных пользователей

    // пайпы можно так же указывать глобально app у вызываем useGlobalPipes туда передаем все необхадимые пайпы
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`)) // запускаем сервер listen как в express
}

start()