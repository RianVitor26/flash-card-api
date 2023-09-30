import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() userDto: CreateUserDto) {
    const createdUser = this.usersService.create(userDto);
    return createdUser;
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return users;
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    return user;
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    const updatedUser = this.usersService.update(id, userDto);
    return updatedUser;
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}
