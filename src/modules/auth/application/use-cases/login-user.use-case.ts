import { Injectable } from '@nestjs/common';
import { UserService } from '../../infrastructure/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { LoginDto } from '../dto/login.dto';
import { SessionDto } from '../dto/session.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(login: LoginDto): Promise<SessionDto> {
    const { user, token, refreshToken } = await this.userService.login(login.email, login.password);
    return {
        user: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
        },
        token: token,
        refreshToken: refreshToken
    };
  }
}