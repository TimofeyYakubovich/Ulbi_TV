import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

// так как контроллеров может быть несколько надо групировать эндпоинты внутри отдельно взятого контроллера
@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    // создадим ендпоинты для создания и получения пользователей

    // что бы использовать сервис UsersService внутри контроллера надо сделать инъекцию Dependency Injections
    constructor(private usersService: UsersService) {}

    // задкоментируем ендпоинты для этого используем декораторы ApiOperation передаем объект в катором указываем настройки summary описание
    // ApiResponse какой статус должен вернуть ендпоинт и какие данные объект типа User
    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe) // что бы использовать папйп используем декоратор UsePipes в него передаем пайп
    @Post()
    create(@Body() userDto: CreateUserDto) { // как тело запроса функция create принимает userDto
        // и внутри этой функции дергаем метод createUser из сервиса UsersService и туда передаем userDto из тела запроса
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]}) // тут уже возвращает массив объектов пользователей
    // @UseGuards(JwtAuthGuard) // что бы использовать гуард на функции getAll декоратор UseGuards передаем гуард
    @Roles("ADMIN") // воспользуемся гуардом ролей сначала в самодельный декоратор Roles прописываем через , роли для каво доступен ендпоинт
    @UseGuards(RolesGuard) // далее навешиваем RolesGuard
    @Get()
    getAll() {
        return this.usersService.getAllUser()
    }

    // функция для выдачи роли
    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    // функция для бана пользователей
    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }
}
