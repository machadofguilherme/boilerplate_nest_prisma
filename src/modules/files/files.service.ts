import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '@database/PrismaService';

@Injectable()
export class FilesService {
  @Inject()
  private readonly prisma: PrismaService;

  async getAllFiles() {
    const allData = await this.prisma.file.findMany();
    return allData;
  }
}
