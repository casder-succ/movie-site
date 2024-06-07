import { Controller, HttpCode, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { Auth } from 'auth/decorators/auth.decorator';

import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(200)
  @Auth('admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(
  @UploadedFile() files: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return this.filesService.uploadFiles([files], folder);
  }

  @Post('batch')
  @HttpCode(200)
  @Auth('admin')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFilesBatch(
  @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('folder') folder?: string,
  ) {
    return this.filesService.uploadFiles(files, folder);
  }
}
