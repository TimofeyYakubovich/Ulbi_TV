import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./roles.model";
import { User } from "../users/users.model";

// что бы не захломлять эту таблицу датами создания и обновления в опции в Table добоаляем createdAt: false, updatedAt: false
@Table({tableName: 'user-roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // внешние ключи на таблицы что бы sequelize понимал что это внешний ключ помечаем его декоратором @ForeignKey и уазываем на что этот 
    // ключ ссылается 
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: string;   

} 