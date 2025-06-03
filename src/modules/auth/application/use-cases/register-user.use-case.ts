import { Injectable } from '@nestjs/common';
import { UserService } from '../../infrastructure/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(user: CreateUserDto): Promise<UserResponseDto> {
    const userRegistered = await this.userService.register(user);
    return {
        id: userRegistered.id,
        name: userRegistered.name,
        lastName: userRegistered.lastName,
        email: userRegistered.email
    };
  }
}