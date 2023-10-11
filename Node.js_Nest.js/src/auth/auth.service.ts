import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    // заинжектим UsersService и JwtService из jwt модуля
    // вместо JwtService рекомендуется использовать passport js  
    constructor(private usersService: UsersService, 
        private jwtService: JwtService) {}

    async login( userDto: CreateUserDto) {
        // создаем объект user его будем получать из функции validateUser передаем ей userDto
        const user = await this.validateUser(userDto)
        // на основании возаращенного user возвращаем сгенерированый токен
        return this.generateToken(user)
        
    }

    async registration( userDto: CreateUserDto) {
        // надо проверить есть ли пользователь с таким email
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        // если пользователь с таким email нашелся то бросаем ошибку
        // ошибки в базовом варианте в Nest js представлены классом HttpException 1 параметр сообщение каторое вернется на клиент 2 статус код 400
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        // далее если пользователь с таким email не найден то захешируем пароль используем bcrypt функцию hash передаем пароль и соль
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        // далее создаем пользователя в createUser разварачиваем userDto но перезаписываем поле password: hashPassword
        // роль ему присваивается внутри usersService
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        // поиогу из этой функции будет возвращаться токен из функции generateToken принимает user и на основе его данных генерирует токен
        return this.generateToken(user)
    }

    // private приватная функция так как она используется только внутри сервиса
    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            // токен генерируется с помощью jwtService функция sign передаем payload остальное указали при регистрации модуля
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        // пробуем получаем юзера по его email
        const user = await this.usersService.getUserByEmail(userDto.email)
        // проверяем совпадает ли пароль каторый пришел с клиента и пароль в бд обращаемся к bcrypt функции compare
        // 1 передаем пароль с клиента 2 пароль из бд
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        // если пользватель был найден и пароли совпадают то возвращае пользователя
        if(user && passwordEquals) {
            return user;
        }
        // в обратном случае выбрасываем ошибку UnauthorizedException это нестовская ошибка наследуется от HttpException
        // 1 передаем респонс каторый возвращаем на клиент с полем message
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }

}
