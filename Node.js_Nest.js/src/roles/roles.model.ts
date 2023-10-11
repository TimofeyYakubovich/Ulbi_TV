import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    // в интерфейсе опишем поля каторые нужны только для создания объекта из этого класса
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Уникальное значение роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;   

    // так как 1 пользователь может иметь много ролей и каждая роль может принадлежать многим пользователям то связ между 
    // сущностями много ко многим в таком случае создается промежуточная таблица User_Roles и в этой таблице указывается какой пользователь 
    // облададет какими ролями в ней есть 2 внешних ключа на таблицу пользователей и на таблицу ролей
    // реализуем такую связь для этого есть декораторы @BelongsToMany указываем с какой сущностью мы связываем () => User
    // и через какую таблицу это делаем () => UserRoles
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
} 