import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

// роли пользователя
// реализуем функционал где 1 пользователь может иметь несколько ролей
// nest generate module roles  nest generate service roles  nest generate controller roles

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [
    RolesService // в exports добовляем RolesService что бы его испьзовать в UsersService и добавить в UsersModule теперь этот сервис RolesService
                 // будет импортироваться вместе со всем модулем в UsersService и там его можно использовать
  ]
})
export class RolesModule {}
