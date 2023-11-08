import { Module } from '@nestjs/common'
import { BdLocationController } from './bd-location.controller'
import { BdLocationService } from './bd-location.service'
import { DistrictModule } from './district/district.module'
import { DivisionModule } from './division/division.module'
import { PostcodeModule } from './postcode/postcode.module'
import { UnionModule } from './union/union.module'
import { UpazilaModule } from './upazila/upazila.module'

@Module({
  imports: [DivisionModule, DistrictModule, UpazilaModule, UnionModule, PostcodeModule],
  controllers: [BdLocationController],
  providers: [BdLocationService],
})
export class BdLocationModule {}
