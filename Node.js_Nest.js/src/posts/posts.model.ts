
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
    // в интерфейсе опишем поля каторые нужны только для создания объекта из этого класса
    title: string;
    content: string;
    userId: number;
    image: string; // название изображения
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string; 

    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number; // внешний ключ на пользователя модели User

    // так как 1 пользователь может иметь много постов то тип связи будет 1 ко многим декоратор @BelongsTo
    @BelongsTo(() => User)
    author: User // добовляем к посту автора тип User
} 