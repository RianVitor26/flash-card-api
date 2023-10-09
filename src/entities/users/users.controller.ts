import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    const createdUser = this.usersService.create(userDto);
    return createdUser;
  }

  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: 200, description: 'Users found successfully' })
  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return users;
  }

  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @Get('/:userId')
  findOne(@Param('userId') userId: number) {
    const user = this.usersService.findOne(userId);
    return user;
  }

  @ApiOperation({ summary: 'Update one user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @Put('/:userId')
  update(@Param('userId') userId: number, @Body() userDto: UpdateUserDto) {
    const updatedUser = this.usersService.update(userId, userDto);
    return updatedUser;
  }

  @ApiOperation({ summary: 'Delete one user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @Delete('/:userId')
  remove(@Param('userId') userId: number) {
    this.usersService.remove(userId);
  }
}
