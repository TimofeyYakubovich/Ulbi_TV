// создадим модуль

import { Module } from "@nestjs/common";
// import { AppController } from "./app.controller";
// import { AppService } from "./app.Service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'


// экспортируем класс AppModule
// весь nest построен вокруг декораторов помечаем этот класс декоратором Module
// декаратор это своего рода обертка каторая добвдяет классу или функции какойто новый функционал
// в этот декоратор передаем объект и у него есть несколко полей exports imports controllers providers
@Module({
    // что бы конроллер заработал регистрируе его в модуле
    // в полу controllers передаем массив так как кнтроллеров может быть несколько туда передаем AppController
    // controllers: [AppController],
    // провайдером может быть любой переиспользуемый компанент приложения сервисы с логикой, имплиментации партернов стратегий все что содержит
    // какую то логику и может использоваться в других компанентах
    // что бы использовать сервис AppService внутри контроллера нао добавить сервис в поле providers
    // providers: [AppService],
    controllers: [],
    providers: [],
    // есл надо в наш модуль импортировать другие модули то создаем массив импортов и добовляем туда необходимые модули 
    imports: [
        // что бы нест всю конфигурацию считывал надо добавить в ипорты ConfigModule
        ConfigModule.forRoot({
            // как правила конфигурация для dev разработки и для продакшена отличается поэтому создадаем 2 файла .production.env .development.env
            // в package.json подправим скрипты для этого понадобится пакет npm i cross-env что бы можно было при запуске уже задавать какие то 
            // системные переменные
            // для режима разработки переменную NODE_ENV устанавливаем в development "start:dev": "cross-env NODE_ENV=development nest start --watch"
            // для запуска продакшена "start": "cross-env NODE_ENV=production nest start"
            // envFilePath: '.env' // путь д файла конфигурации с систеными переменными
            // что бы системные переменные влияли на конфигурацинный файл путь к конфигурацинному файлу будем задовать на основании
            // системной переменной каторую задаем при запуске
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        // для раздачи статики устанавливаем npm install --save @nestjs/serve-static
        // так же импортирукм ServeStaticModule 
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static') // указываем путь к папке с фалами картинок
          }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            // сдесь регестрируем модель User
            models: [User, Role, UserRoles, Post],
            autoLoadModels: true // что бы Sequelize создавал таблицы в бд на основании тех моделей каторые мы будем создавать
          }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ]
})
export class AppModule {}