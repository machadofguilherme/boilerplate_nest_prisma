import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

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

  @Put('update/:id')
  async updateFile(@Param('id') id: number, @Body() body: IFiles, @Req() req) {
    const { fileUrl, fileKey } = body;
    const userId = req.user.id;

    if (!fileUrl || !fileKey) {
      throw new BadRequestException('Data not filled');
    }

    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid Id');
    }

    const response = await this.filesService.updateOneFile(fileKey, fileUrl, userId, Number(id));
    return response;
  }
}
