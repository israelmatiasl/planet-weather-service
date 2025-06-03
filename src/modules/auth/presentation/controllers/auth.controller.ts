import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';
import { UserResponseDto } from '../../application/dto/user-response.dto';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { LoginDto } from '../../application/dto/login.dto';
import { SessionDto } from '../../application/dto/session.dto';
import { Public } from 'src/shared/middleware/public';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly registerUser: RegisterUserUseCase,
        private readonly loginUser: LoginUserUseCase,
    ) {}

    @Public()
    @Post('signup')
    async register(
        @Body() user: CreateUserDto
    ): Promise<UserResponseDto> {
        return await this.registerUser.execute(user);
    }

    @Public()
    @Post('signin')
    async login(
        @Body() login: LoginDto
    ): Promise<SessionDto> {
        return await this.loginUser.execute(login);
    }
}