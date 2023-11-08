import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePostcodeDto, FilterPostcodeDto, UpdatePostcodeDto } from '../dtos'
import { PostcodeEntity } from '../entities/postcode.entity'
import fs from 'fs'
import { Repository } from 'typeorm'

@Injectable()
export class PostcodeService {
  private logger = new Logger(PostcodeService.name)

  constructor(
    @InjectRepository(PostcodeEntity)
    private readonly postcodeRepo: Repository<PostcodeEntity>,
  ) {}

  async getPostcodes(ctx: RequestContextDto, filterPostcodeDto: FilterPostcodeDto) {
    this.logger.log(`${this.getPostcodes.name} called`)

    // const { postOffice, postCode } = filterPostcodeDto;

    const qb = this.postcodeRepo
      .createQueryBuilder('postCd')
      .select([
        'postCd.id',
        'postCd.postCode',
        'postCd.postOffice',
        'postCd.divisionId',
        'postCd.districtId',
        'postCd.upazilaId',
        'postCd.unionId',
        'division.id',
        'division.name',
        'district.id',
        'district.name',
        'upazila.id',
        'upazila.name',
        'union.id',
        'union.name',
      ])
      .leftJoin('postCd.division', 'division')
      .leftJoin('postCd.district', 'district')
      .leftJoin('postCd.upazila', 'upazila')
      .leftJoin('postCd.union', 'union')

    return await qb.getMany()

    // if (postOffice) reqQuery.postOffice = postOffice;
    // if (postCode) reqQuery.postCode = postCode;

    // return this.postcodeRepo.find({ where: reqQuery });
  }
  async getPostcode(ctx: RequestContextDto, id: number) {
    this.logger.log(`${this.getPostcode.name} called`)

    const postcode = await this.postcodeRepo.findOne({ where: { id } })
    if (!postcode) {
      throw new NotFoundException(`Postcode of id ${id} not found.`)
    }

    return postcode
  }

  async createPostcode(ctx: RequestContextDto, createPostcodeDto: CreatePostcodeDto) {
    this.logger.log(`${this.createPostcode.name} called`)

    const postcode = this.postcodeRepo.create(createPostcodeDto)

    await this.postcodeRepo.save(postcode)

    // const logDto = { actionType: LogActionType.Create,  postcodeId: postcode.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return postcode
  }

  async updatePostcode(ctx: RequestContextDto, id: number, updatePostcodeDto: UpdatePostcodeDto) {
    this.logger.log(`${this.updatePostcode.name} called`)

    const postcode = await this.getPostcode(ctx, id)
    this.postcodeRepo.merge(postcode, updatePostcodeDto)

    await this.postcodeRepo.save(postcode)

    // const logDto = { actionType: LogActionType.Update,  postcodeId: postcode.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return postcode
  }

  async deletePostcode(ctx: RequestContextDto, id: number) {
    this.logger.log(`${this.deletePostcode.name} called`)

    const postcode = await this.getPostcode(ctx, id)
    this.postcodeRepo.remove(postcode)

    // const logDto = { actionType: LogActionType.Delete,  postcodeId: postcode.id } as CreateLogDto;
    // await this.logService.createUserLog(ctx, logDto);

    return postcode
  }

  clearPostcodeData() {
    this.logger.log(`${this.clearPostcodeData.name} called`)
    return this.postcodeRepo.clear()
  }

  initiatePostcodeData(): Promise<PostcodeEntity[]> {
    this.logger.log(`${this.initiatePostcodeData.name} called`)

    const postcodeData = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../../../../../../mock-data/bd-location/postcodes.json`,
        'utf-8',
      ),
    )
    const postcodes = this.postcodeRepo.create(postcodeData)

    return this.postcodeRepo.save(postcodes)
  }
}
