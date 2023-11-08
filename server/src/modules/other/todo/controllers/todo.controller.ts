import { JwtAuthGuard } from "@admin/auth/guards/jwt-auth.guard";
import { RequestContext } from "@common/decorators/request-context.decorator";
import { BaseApiSuccessResponse } from "@common/dtos/base-api-response.dto";
import { RequestContextDto } from "@common/dtos/request-context.dto";
import { Body, Controller, Delete, Get, Logger, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateTodoDto, TodoResponseDto, FilterTodoDto, UpdateTodoDto } from "../dtos";
import { TodoService } from "../services/todo.service";


@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  private logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService){}

  @Get('/')
  async getTodos(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterTodoDto:FilterTodoDto
  ): Promise<BaseApiSuccessResponse<TodoResponseDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving all Todos.`);
    
    const todos = await this.todoService.getTodos(ctx, filterTodoDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of todos`,
      totalRecords: todos.length,
      data: todos
    }

  };


  @Get('/:id')
  async getTodo(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<BaseApiSuccessResponse<TodoResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving Todo info. of id: ${id}`);
    
    const todo = await this.todoService.getTodo(ctx, id);

    return {
      success: true,
      statusCode:200,
      message: `Details of todo of id: ${id}`,
      data: todo
    }
  };


  @Post('/')
  async createTodo(
    @RequestContext() ctx: RequestContextDto,
    @Body() createTodoDto: CreateTodoDto
  ): Promise<BaseApiSuccessResponse<TodoResponseDto>>  {
    this.logger.verbose(`User "${ctx.user?.username}" creating new Todo.`);
    
    const todo = await this.todoService.createTodo(ctx, createTodoDto);

    return {
      success: true,
      statusCode: 201,
      message: `New todo of id: ${todo.id} created`,
      data: todo
    }
  };



  @Put('/:id')
  async updateTodo(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto
  ): Promise<BaseApiSuccessResponse<TodoResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating Todo of id ${id}.`);
    
    const todo = await this.todoService.updateTodo(ctx, id, updateTodoDto);

    return {
      success: true,
      statusCode: 200,
      message: `Todo of id ${id} updated`,
      data: todo
    }
  };


  @Delete('/:id')
  async deleteTodo(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<BaseApiSuccessResponse<TodoResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting a Todo. of id: ${id}`);
    
    const todo = await this.todoService.deleteTodo(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Todo of id ${id} deleted`,
      data: todo
    }
  };
}