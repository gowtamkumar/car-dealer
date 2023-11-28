import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { FilterUserDto } from '../dtos/filter-user.dto'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserEntity } from '../entities/user.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { UpdatePasswordDto } from '../dtos/update-password.dto'
import fs from 'fs'
import * as bcrypt from 'bcrypt'
import { UserDto } from '../dtos/user.dto'

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name)

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  getUsers(ctx: RequestContextDto, filterUserDto: FilterUserDto): Promise<UserEntity[]> {
    this.logger.log(`${this.getUsers.name}Service Called`)
    // logic for filter
    return this.userRepo.find()
  }

  async getUser(ctx: RequestContextDto, id: string): Promise<UserEntity> {
    this.logger.log(`${this.getUser.name}Service Called`)

    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`)
    }
    return user
  }

  async findUserById(id: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { id } })
  }

  async findUserByUsername(username: string) {
    const user = await this.userRepo.findOne({ where: { username } })
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    return user
  }


  async findByUsername({ username }) {
    const user = await this.userRepo.findOne({ where: { username } })
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    delete user.password
    return user
  }

  async createUser(ctx: RequestContextDto, createUserDto: CreateUserDto): Promise<UserEntity> {
    this.logger.log(`${this.createUser.name}Service Called`)
    const { username } = createUserDto

    const findUser = await this.userRepo.findOne({ where: { username } })
    if (findUser) {
      throw new NotFoundException('User Already Registered')
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.userRepo.create({ ...createUserDto, password: hashPassword })
    await this.userRepo.save(user)
    delete user.password
    return user
  }

  async updateUser(ctx: RequestContextDto, id: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`${this.updateUser.name}Service Called`)
    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`)
    }
    this.userRepo.merge(user, updateUserDto)
    return this.userRepo.save(user)
  }

  async updatePassword(
    ctx: RequestContextDto,
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    this.logger.log(`${this.updatePassword.name}Service Called`)

    const { currentPassword, newPassword } = updatePasswordDto

    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`)
    }

    const valid = await this.validateUser(user, currentPassword)
    if (!valid) {
      throw new UnauthorizedException('Password is not valid')
    }

    user.password = await bcrypt.hash(newPassword, 10)
    return this.userRepo.save(user)
  }

  async resetPassword(ctx: RequestContextDto, id: string, newPassword: string): Promise<UserDto> {
    this.logger.log(`${this.resetPassword.name} Called`)

    const user = await this.getUser(ctx, id)

    user.password = await bcrypt.hash(newPassword, 10)
    // delete user.password
    return this.userRepo.save(user)
  }

  async deleteUser(ctx: RequestContextDto, id: string): Promise<UserEntity> {
    this.logger.log(`${this.deleteUser.name}Service Called`)

    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`)
    }
    return this.userRepo.remove(user)
  }

  validateUser(user: UserEntity, password: string): Promise<boolean> {
    this.logger.log(`${this.validateUser.name} Called`)
    return bcrypt.compare(password, user.password)
  }

  initiateUser(ctx: RequestContextDto): Promise<UserEntity[]> {
    this.logger.log(`${this.getUsers.name}Service Called`)
    const users = JSON.parse(
      fs.readFileSync(`${__dirname}/../../../../../mock-data/users.json`, 'utf-8'),
    )
    // const erp_accounts = JSON.parse(fs.readFileSync(`../_data/coa-erp.json`, 'utf-8'));

    const newusers = this.userRepo.create(users)
    return this.userRepo.save(newusers)
  }
}
