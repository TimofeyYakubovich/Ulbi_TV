// roles гуард будет ограничевать доступ к ендпоинтам для определенных ролей

import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    // что бы получить роли инжектим сюда еще класс Reflector
    constructor(private jwtService: JwtService, 
        private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            // помещаем роли в requiredRoles у reflector вызываем функцию getAllAndOverride 1 передаем ROLES_KEY 2 массив из 2 элиментов каторые 
            // берем у контекста что бы этот рефлектор пониал какие данные ему надо доставать
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [ // указваем тип requiredRoles массив стрингов <string[]>
                context.getHandler(),
                context.getClass()
            ])
            // если ролей нет то возвращаем true и эта функция будет доступна всем пользователям
            if (!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest() 
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const user = this.jwtService.verify(token)
            req.user = user;
            // после ого как токен декодировали обращаемся к ролям каторые лежат внутри токена user с помощью функции some проверяем есть ли
            // у пользоваеля такая роль каторая находится в неообходимых для этого ендпоинта ролях
            // есть ли у пользователя необходимая для этого ендпоинта роль если есть функция some вернет true и доступ будет разрешен
            // если нет вернет false и получим ошибку
            return user.roles.some(role => requiredRoles.includes(role.value))

        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN) // HttpStatus.FORBIDDEN Нет доступа
        }
    }
}
