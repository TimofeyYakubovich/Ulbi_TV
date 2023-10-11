// гуарды в Nest js
// их роль заключается в том что бы ограничеть доступ до каких то ендпоинтов
// реализуем функционал каорый будет запрещать обращаться неавторизованным пользователям к тем или иным ендпоинтам

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

// создадим гуард jwt-auth это просто класс каторый имплементирует интерфейс CanActivate
@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { // заинжектим в этот класс JwtService
    }

    // среда разработки предлаает имплементировать функцию canActivate параметром она принимает контекст
    // суть функции в том что кода она возвращает false досту запрещен true разрешен
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest() // получаем объект рекуеста из контекста
        // внутри этого рекуеста можно получить хедеры тело запроса и тд
        try {
            const authHeader = req.headers.authorization; // вытаскиваем хедер authorization это тип токена bearer и сам токен
            // делим authHeader на 2 части функцией split по пробелу 1 объект тип токена 2 объект сам токен
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token) { // если нет токена или bearer !== 'Bearer' то выбрасываем ошибку
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            // если эта проверка не прошла то раскодируем токен функция jwtService.verify
            const user = this.jwtService.verify(token)
            // после раскодированного user помещаем в рекуест и возвращаем из функции true
            req.user = user;
            return true;

        } catch (e) {
            // в случае ошибки выбрасываем оишбку UnauthorizedException с сообщением message
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }
}
