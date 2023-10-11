// app.controller.ts и app.Service.ts уже не нужны
// систему будем декомпазировать на отдельные подмодули каторые поитогу заимпортрруем в главный app.module.ts
// создаем папку users можно создавать модуль контроллер сервис вручную но можно использовать nestjs/cli каторый сделает это за нас
// nest generate module users и в папке users nestjs/cli создал готовый users модуль и о сразу добавился в импорты главного app.module.ts
// так же создаем контроллер nest generate controller users
// и сервис nest generate service users
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/posts.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // сдесь в импорты так же надо добавить в SequelizeModule.forFeature в массив модель User
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RolesModule, // теперь можно использовать RolesService внутри UsersService
    // AuthModule,   // добовляем сюда AuthModule и плкчаем ошибку потому что получается кольцевая зависимсоть тоесть AuthModule используется
                 // внутри UsersModule и UsersModule внутри AuthModule что бы ее предотвратить оборачиваем модули в forwardRef(() => AuthModule)
    forwardRef(() => AuthModule) // теперь в UsersModule можно использовать JwtAuthGuard
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
