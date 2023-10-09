import { PrismaService } from '../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: CreateUserDto;
    try {
      user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      const isPassordValid = await compareSync(password, user.password);
      if (!isPassordValid) return null;

      return user;
    } catch (error) {
      return null;
    }
  }
}
