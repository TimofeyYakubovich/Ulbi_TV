export class CreatePostDto {
    readonly title: string;
    readonly content: string;
    readonly userId: number; // id пользователя похорошему доставать из токена
}