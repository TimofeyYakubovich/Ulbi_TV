import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

// работа с файлами nest generate module files nest generate service files контроллер тут не нужен этот сервис будет использоваться внутри
// других контроллеров сервисов

@Module({
  providers: [FilesService],
  exports: [FilesService] // теперь можем импортрировать этот FilesModule и вместе с ним будет импортироваться FilesService
})
export class FilesModule {}
