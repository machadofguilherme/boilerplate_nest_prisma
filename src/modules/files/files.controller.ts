import { Controller, Get, Inject } from '@nestjs/common';

import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  @Inject()
  private readonly filesService: FilesService;

  @Get('all')
  async getAll() {
    return await this.filesService.getAllFiles();
  }
}
