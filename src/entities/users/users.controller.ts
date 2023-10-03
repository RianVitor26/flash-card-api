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

  @Get('/:userId')
  findOne(@Param('userId') userId: number) {
    const user = this.usersService.findOne(userId);
    return user;
  }

  @Put('/:userId')
  update(@Param('userId') userId: number, @Body() userDto: UpdateUserDto) {
    const updatedUser = this.usersService.update(userId, userDto);
    return updatedUser;
  }

  @Delete('/:userId')
  delete(@Param('userId') userId: number) {
    this.usersService.delete(userId);
  }
}
