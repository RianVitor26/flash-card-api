import { PrismaService } from '../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };
    return {
      id: user.id,
      email: user.email,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: AuthLoginDto;
    try {
      user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) return null;

      return user;
    } catch (error) {
      return null;
    }
  }
}
