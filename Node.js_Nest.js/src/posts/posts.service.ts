import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {}

    async create(dto: CreatePostDto, image: any) {
        
        const fileName = await this.fileService.createFile(image) // этот метод вернет строку с названием файла
        // сохраняем post в бд разварачиваем ...dto а поле image перезаписываем так как в нем сейчас само изображение а нам нужно его название
        const post = await this.postRepository.create({...dto, image: fileName})
        return post
    }
}
