import { Injectable, Logger } from '@nestjs/common'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { DivisionService } from './division/services/division.service'
import { DistrictService } from './district/services/district.service'
import { UpazilaService } from './upazila/services/upazila.service'
import { FilterDistrictDto } from './district/dtos'
import { FilterUpazilaDto } from './upazila/dtos'
import { FilterDivisionDto } from './division/dtos'
import { Transactional } from 'typeorm-transactional-cls-hooked'

@Injectable()
export class BdLocationService {
  private logger = new Logger(BdLocationService.name)

  constructor(
    private readonly divisionService: DivisionService,
    private readonly districtService: DistrictService,
    private readonly upazilaService: UpazilaService,
  ) {}

  async getBdLocation(ctx: RequestContextDto): Promise<any> {
    this.logger.log(`${this.getBdLocation.name} called`)

    const divisions = await this.divisionService.getDivisions(ctx, {} as FilterDivisionDto)
    const districts = await this.districtService.getDistricts(ctx, {} as FilterDistrictDto)
    const upazilas = await this.upazilaService.getUpazilas(ctx, {} as FilterUpazilaDto)

    return {
      divisions: divisions,
      districts: districts,
      upazilas: upazilas,
    }
  }

  async getBdLocationNested(ctx: RequestContextDto): Promise<any> {
    this.logger.log(`${this.getBdLocationNested.name} called`)

    const districts = await this.districtService.getDistrictsNested(ctx)

    return districts
  }

  @Transactional()
  async clearBdLocation(ctx: RequestContextDto) {
    this.logger.log(`${this.clearBdLocation.name} called.`)

    await this.upazilaService.clearUpazilaData()
    await this.districtService.clearDistrictData()
    await this.divisionService.clearDivisionData()

    return 'Bd Location data cleared'
  }

  @Transactional()
  async initiateBdLocation(ctx: RequestContextDto) {
    this.logger.log(`${this.initiateBdLocation.name} called.`)

    // await this.clearBdLocation(ctx);

    await this.divisionService.initiateDivisionData()
    await this.districtService.initiateDistrictData()
    await this.upazilaService.initiateUpazilaData()

    return 'Bd Location data populated'
  }
}
