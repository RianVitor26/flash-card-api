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
  readAll() {
    const users = this.usersService.readAll();
    return users;
  }

  @Get('/:id')
  readById(@Param('id') id: string) {
    const user = this.usersService.readById(id);
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
