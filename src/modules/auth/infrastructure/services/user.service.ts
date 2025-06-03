import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../persistence/user.repository';
import { User } from '../../domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
    constructor(
            @Inject('UserRepository')
            private readonly userRepository: UserRepository,
            private readonly jwtService: JwtService
        ) {}
    
        public async register(entity: { 
            name: string,
            lastName: string,
            email: string,
            password: string
        }): Promise<User> {

            const userExists = await this.userRepository.findUserByEmail(entity.email);
            if (userExists) {
                throw new Error('User already exists');
            }

            const user = User.create({
                name: entity.name,
                lastName: entity.lastName,
                email: entity.email,
                password: await bcrypt.hash(entity.password, SALT_ROUNDS)
            });

            await this.userRepository.save(user);
    
            return user;
        }
    
        public async login(email: string, password: string): Promise<{ user: User, token: string }> {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error('Email or password is incorrect');
            }

            console.log(password, user.password);
            const isPasswordValid = await bcrypt.compare(password, user.password!);
            if (!isPasswordValid) {
                throw new Error('Email or password is incorrect');
            }

            const payload = { email: user.email, sub: user.id };
            const token = await this.jwtService.signAsync(payload);

            user.password = undefined;

            return { user, token };
        }
        
}