import { setResponse, ResponseType } from '../core/helpers/response-helper';
import { BaseResponse } from './../utils/base-response';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Auth } from '../core/decorators/auth.decorator';
import { PaginateDto } from '../core/dtos/paginate.dto';

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Query() paginateDto: PaginateDto) {
    const meta = paginateDto;
    const data = await this.userService.findAll(paginateDto);

    return setResponse(ResponseType.List, data, { meta });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: "user has been successfully created.",
    type: BaseResponse,
  })
  async create(@Auth() user, @Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto, user);
    return setResponse(ResponseType.Create, null);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return setResponse(ResponseType.Read, await this.userService.findOne(id));
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Auth() user
  ) {
    await this.userService.update(id, updateUserDto, user);
    return setResponse(ResponseType.Update, null);
  }

  @Delete(":id")
  async remove(@Auth() user, @Param("id") id: string) {
    await this.userService.remove(id, user);
    return setResponse(ResponseType.Delete, null);
  }
}
