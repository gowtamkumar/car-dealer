import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UpazilaController } from './controllers/upazila.controller'
import { UpazilaEntity } from './entities/upazila.entity'
import { UpazilaService } from './services/upazila.service'

@Module({
  imports: [TypeOrmModule.forFeature([UpazilaEntity])],
  controllers: [UpazilaController],
  providers: [UpazilaService],
  exports: [UpazilaService],
})
export class UpazilaModule {}
