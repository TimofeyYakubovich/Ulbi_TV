import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    
    // работать с таблицей User добовлять удалять и тд. данные будем внутри сервиса
    // внутрь сервиса добовляем модель в конструктор передаем декоратор InjectModel передаем ему модель называем userRepository
    // при создании пользователя надо присваивать ему роль для этого сюда заинжектим RolesService
    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService: RolesService) {}

    // на вхд в эту функцию должен поступать какой то объект обычно такие объекты называют dto 
    // dto это простой объект каторый не содержит в себе никакой логики и имет только поля эти объекты предназаначены для обмена данными между 
    // какими то подсистемами например клиент и сервер или сервер сервер
    async createUser(dto: CreateUserDto) { // параметром функция принимает dto типа CreateUserDto
        // внутри Dto email и password поэтому создаем пользователя
        // обращаемся к бд модели userRepository вызываем функцию create и ей передаем dto
        const user = await this.userRepository.create(dto)
        // после создания пользователя присваиваем ему роль сначала получаем ее из базы данных поумолчанию USER
        const role = await this.rolesService.getRoleByValue("USER")
        // теперь надо указать что эта роль принадлежит пользователю для этого используем метод $set() каторый позволяет перезаписать какое то
        // поле и сразу обновить его внутри бд так как изначально у пользователя ролей нет указываем массив в каторый добовляем 
        // role.id из роли
        await user.$set('roles', [role.id])
        // при создании пользователя функция $set добовляет roles в бд но при этом у самого пользователя этой роли нет 
        // поэтому напрямую в объект user добовляем поле roles
        user.roles = [role]
        return user;
    }

    async getAllUser() {
        // для получения так же обращаемся к бд модели userRepository вызываем функцию findAll
        // что бы сразу получать пользователя с его ролями в findAll передаем опции include в ней можно указать конкретно какую модель
        // каторую хотим получить вместе с пользователем или all: true тоесть получать все поля с каторыми связан пользователь
        const users = await this.userRepository.findAll({include: {all: true}})
        return users; // возвращаем массив пользователей
    }

    // функция дя проверки есть ли такой Email в бд
    async getUserByEmail (email: string) {
        // как критерий поиска передаем email и include: {all: true} что бы подтягивались роли
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId) // получаем пользователя в Id внтури dto
        const role = await this.rolesService.getRoleByValue(dto.value) // получаем роль из бд
        if (role && user) { // если и роль и пользователь были найдены в бд то дбовляе роль пользователю с помощью функции $add
            await user.$add('role', role.id) // 1 параметр поле каторое хотим добавить 2 значение 
            // с помощью функции $set изначально эти роли инициализировали с помощью $add к уже проинициализированной роли к массиву добовляем
            // еще 1 значение
            return dto;
        }
        // если условие не выполнилось выбрасываем ошмбку
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId) // получаем пользователя в Id внтури dto
        if(!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true; // перезаписываем поле banned в true
        user.banReason = dto.banReason; // и указываем причину блокировки поле banReason
        await user.save(); // функция save обновляем значение в бд
        return user;
    }
}
