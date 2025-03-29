import { BadRequestException, Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';

import { IFiles } from '@interfaces/files/IFiles';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  @Inject()
  private readonly filesService: FilesService;

  @Get('all')
  async getAll() {
    return await this.filesService.getAllFiles();
  }

  @Post('send')
  async sendFile(@Body() body: IFiles, @Req() req) {
    const { fileUrl, fileKey } = body;
    const userId = req.user.id;

    if (!fileUrl || !fileKey) {
      throw new BadRequestException('Data not filled');
    }

    const response = await this.filesService.sendOneFile(fileUrl, fileKey, userId);
    return response;
  }
}
