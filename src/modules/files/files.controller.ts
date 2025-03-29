import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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

  @Get('one/:id')
  async getOne(@Param('id') id: number) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid Id');
    }

    return await this.filesService.findOneFile(Number(id));
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

  @Delete('remove/:id')
  async removeFile(@Param('id') id: number) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid Id');
    }

    return this.filesService.deleteFIle(Number(id));
  }
}
