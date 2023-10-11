// модель пользователя схема как пользователь будет сохроняться в бд

import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "src/posts/posts.model";

interface UserCreationAttrs {
    // в интерфейсе опишем поля каторые нужны только для создания объекта из этого класса
    email: string;
    password: string;
}

// создаем класс каторый наследуется от класса Model из sequelize-typescript
// как джейнерик уазваем сам этот класс
// для того что бы этот класс стал таблицей в бд помечаем его декоратором Table в объект опций передаем tableName название таблицы users
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    // внутри описываем поля каторые будут у пользователя для того что бы эти поля стали калонноками помечаем их декоратором Column
    // и передаем ему опции type: DataType.INTEGER - тип числовой, unique: true - поле всегда уникальное, autoIncrement: true - с каждым 
    // последующей записью автоинкрементируется 1 2 3, primaryKey: true - первичный ключ
    // сами данные каторые возвращаем так же надо задокументировать декоратором ApiProperty
    // example то как эт поле должно выглядеть в случае id просто 1 description описание
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // allowNull: false - не может быть пустым
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '123456', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;   

    // так же администраторы приложения смогут банить пользователей banned будет отображать забанен пользователь или нет
    // defaultValue: false - подефолту всегда false
    @ApiProperty({example: 'true', description: 'Забанен пользователь или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    // banReason будет показывать причину этой блокирвки
    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    // так как 1 пользователь может иметь много постов испльзуем декоратор @HasMany в нем указваем какова типа будет эта зависимость
    // тоесть 1 пользователь имеет много постов
    @HasMany(() => Post)
    posts: Post[] // создаем поле posts типа Post массив

} 