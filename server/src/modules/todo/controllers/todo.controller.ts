import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard'
import { RequestContext } from '@common/decorators/request-context.decorator'
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { TodoDto, CreateTodoDto, FilterTodoDto, UpdateTodoDto } from '../dtos'
import { TodoService } from '../services/todo.service'

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  private logger = new Logger(TodoController.name)

  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  async getTodos(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterTodoDto: FilterTodoDto,
  ): Promise<BaseApiSuccessResponse<TodoDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving todos.`)

    const result = await this.todoService.getTodos(ctx, filterTodoDto)

    return {
      success: true,
      statusCode: 200,
      message: `List of todos`,
      data: result,
    }
  }

  @Get('/:id')
  async getTodo(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<TodoDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving todo. Id: ${id}`)

    const result = await this.todoService.getTodo(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Todo of id: ${id}`,
      data: result,
    }
  }

  @Post('/')
  async createTodo(
    @RequestContext() ctx: RequestContextDto,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<BaseApiSuccessResponse<TodoDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating todo.`)

    const result = await this.todoService.createTodo(ctx, createTodoDto)

    return {
      success: true,
      statusCode: 201,
      message: `Todo created`,
      data: result,
    }
  }

  @Put('/:id')
  async updateTodo(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<BaseApiSuccessResponse<TodoDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating todo.`)

    const result = await this.todoService.updateTodo(ctx, id, updateTodoDto)

    return {
      success: true,
      statusCode: 200,
      message: `Todo of id ${id} updated`,
      data: result,
    }
  }

  @Delete('/:id')
  async deleteTodo(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<TodoDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting todo.`)

    const result = await this.todoService.deleteTodo(ctx, id)

    return {
      success: true,
      statusCode: 200,
      message: `Todo of id ${id} deleted`,
      data: result,
    }
  }
}
