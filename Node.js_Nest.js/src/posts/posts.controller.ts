import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {}

    @Post()
    // @UseInterceptors декоратор для работы с файлами передаем ему FileInterceptor каторому параметом указываем название переменной с файлом
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body()dto: CreatePostDto,
              @UploadedFile() image) { // 2 параметром передаем само изображение что бы его получить в ендпоинте используем декоратор @UploadedFile
        return this.postsService.create(dto, image)
    }

}
