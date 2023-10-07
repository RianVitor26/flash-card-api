import { PrismaService } from '../../database/prisma.service';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto) {
    try {
      const { email, password } = userDto;

      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const saltOrRounds = 10;
      const salt = await bcrypt.genSalt(saltOrRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = await this.prisma.user.create({
        data: {
          ...userDto,
          password: hashedPassword,
        },
      });
      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();

      if (!users || users.length === 0) {
        throw new NotFoundException('No users found');
      }
      return users.map((user) => ({
        ...user,
        password: undefined,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!user) {
        throw new NotFoundException('No users found');
      }
      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, userDto: UpdateUserDto) {
    try {
      const existsUser = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!existsUser) {
        throw new NotFoundException('No users found');
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: userDto,
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: number) {
    try {
      const existsUser = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (!existsUser) {
        throw new NotFoundException('No users found');
      }

      await this.prisma.user.delete({
        where: {
          id: Number(userId),
        },
      });

      return { statusCode: HttpStatus.NO_CONTENT };
    } catch (error) {
      throw error;
    }
  }
}
