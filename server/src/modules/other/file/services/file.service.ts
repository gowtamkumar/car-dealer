import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import fs from 'fs'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateFileDto } from '../dtos/create-file.dto'
import { FilterFileDto } from '../dtos/filter-file.dto'
import { UpdateFileDto } from '../dtos/update-file.dto'
import { FileEntity } from '../entities/file.entity'
const uploadDirectory = 'public/uploads'

@Injectable()
export class FileService {
  private logger = new Logger(FileService.name)

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  getFiles(filterFileDto: FilterFileDto): Promise<FileEntity[]> {
    return this.fileRepo.find()
  }

  async getFile(id: string): Promise<FileEntity> {
    const file: FileEntity = await this.fileRepo.findOne({ where: { id } })
    if (!file) {
      throw new NotFoundException(`File of id#${id} not found.`)
    }
    return file
  }

  findFileByFilename(filename: string): Promise<FileEntity> {
    return this.fileRepo.findOne({ where: { filename } })
  }

  // upload and update file
  async createFile(
    ctx: RequestContextDto,
    files,
    createFileDto: CreateFileDto,
  ): Promise<FileEntity[]> {
    const createFileDtos = []
    const deleteQueries: any = []
    // console.log("MMMMMMMm", files, createFileDto);

    Object.entries(files).forEach(([fieldname, filesArr]) => {
      // console.log("AAAAAAAAA", fieldname, filesArr);
      const newFiles: any = filesArr
      newFiles.forEach((file) => {
        const { fieldname, filename, mimetype, size } = file
        deleteQueries.push({ fieldname, ...createFileDto })
        createFileDtos.push({ ...file, ...createFileDto })
      })
    })

    const oldFiles = await this.fileRepo.find({ where: deleteQueries })
    // console.log("Old Files", oldFiles);
    await this.fileRepo.delete({ id: In(oldFiles.map((file) => file.id)) })

    // this.fileRepo.remove(file);

    const newfiles = this.fileRepo.create(createFileDtos)
    await this.fileRepo.save(newfiles)

    oldFiles.forEach((file) => {
      try {
        fs.unlinkSync(file.path)
      } catch (err) {
        console.log(err)
        // throw korte hobe
      }
    })

    return newfiles
  }

  createManyFile(ctx: RequestContextDto, files): Promise<FileEntity[]> {
  
    this.logger.log(`${this.createManyFile.name} Called`)
  
    const createFileDtos = []

    Object.entries(files).forEach(([fieldname, filesArr]) => {
      const newFiles: any = filesArr
      createFileDtos.push(...newFiles)
    })

    const newfiles = this.fileRepo.create(createFileDtos)
    return this.fileRepo.save(newfiles)
  }

  async updateFile(id: string, updateFileDto: UpdateFileDto): Promise<FileEntity> {
    const file = await this.getFile(id)
    Object.assign(file, updateFileDto)
    return this.fileRepo.save(file)
  }

  async updateManyFile(
    ctx: RequestContextDto,
    filenames: string[],
    updateFileDto: UpdateFileDto,
  ): Promise<any> {
    this.logger.log(`${this.updateManyFile.name} Called`)

    // delete oldfiles

    const oldFiles = await this.fileRepo.find({
      where: {
        ...updateFileDto,
        filename: In(filenames),
      },
    })

    const files = await this.fileRepo
      .createQueryBuilder('file')
      .update()
      .set(updateFileDto)
      .where('filename IN(:...filenames)', { filenames })
      // .where("id = :id", { id: 1 })
      .returning('id, fieldname, filename')
      .execute()

    // return files;
  }

  async deleteFile(id: string): Promise<FileEntity> {
    const file = await this.getFile(id)
    try {
      fs.unlinkSync(file.path)
    } catch (err) {
      console.log(err)
    }
    return this.fileRepo.remove(file)
  }

  async removeFiles(files) {
    files.map((filename) => {
      fs.unlink(`${uploadDirectory}/${filename}`, function (err) {
        if (err) throw err
        console.log('File deleted!')
      })
    })
  }
}
