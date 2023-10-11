import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class CreateUserDto { // это Dto предназначено конкретно для создания пользователя

    // задокументируем Dto что бы показывало что ожидаем на входе @ApiProperty
    // сделаем валидацию на декораторах @IsString Должно быть строкой
    // @Length 1 макс 2 мин длина пароля 3 сообщение каторое выведется в случае ошибки
    // @isEmail по регулярному выражению проверяет емаил это или нет
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не менее 4 и не более 16 символов'})
    readonly password: string;
}