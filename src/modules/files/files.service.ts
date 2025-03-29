import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '@database/PrismaService';

@Injectable()
export class FilesService {
  @Inject()
  private readonly prisma: PrismaService;

  async getAllFiles() {
    const allData = await this.prisma.file.findMany();
    return allData;
  }

  async findOneFile(id: number) {
    const oneData = await this.prisma.file.findUnique({ where: { id } });
    return oneData;
  }

  async sendOneFile(fileKey: string, fileUrl: string, userId: number) {
    const createFile = await this.prisma.file.create({
      data: { fileKey, fileUrl, user: { connect: { id: userId } } },
    });

    if (!createFile) {
      throw new BadRequestException('Failed to create file');
    }

    return createFile;
  }

  async updateOneFile(fileKey: string, fileUrl: string, userId: number, id: number) {
    const updateFile = await this.prisma.file.update({
      where: { id },
      data: { fileKey, fileUrl, user: { connect: { id: userId } } },
    });

    if (!updateFile) {
      throw new BadRequestException('Failed to create file');
    }

    return updateFile;
  }
}
