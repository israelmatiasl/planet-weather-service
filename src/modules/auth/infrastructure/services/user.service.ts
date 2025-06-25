import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../persistence/user.repository';
import { 
    AdminConfirmSignUpCommand,
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { User } from '../../domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
    constructor(
            @Inject('UserRepository')
            private readonly userRepository: UserRepository,
            @Inject('COGNITO_CLIENT')
            private readonly cognitoClient: CognitoIdentityProviderClient,
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
            
            const signUpCommand = new SignUpCommand({
                ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
                Username: entity.email,
                Password: entity.password,
                UserAttributes: [
                    { Name: 'email', Value: entity.email },
                    { Name: 'name', Value: entity.name }
                ]
            });

            const confirmCommand = new AdminConfirmSignUpCommand({
                UserPoolId: process.env.COGNITO_USER_POOL_ID,
                Username: entity.email
            });

            const cognitoRegisterResponse = await this.cognitoClient.send(signUpCommand);
            console.log('Cognito response:', cognitoRegisterResponse);
            console.log('Cognito UserSub:', cognitoRegisterResponse.UserSub);

            //const cognitoConfirmResponse = await this.cognitoClient.send(confirmCommand);
            //console.log('Cognito confirm response:', cognitoConfirmResponse);
            //console.log('Cognito UserSub:', cognitoConfirmResponse);

            const user = User.create({
                name: entity.name,
                lastName: entity.lastName,
                email: entity.email,
                password: await bcrypt.hash(entity.password, SALT_ROUNDS),
                sub: cognitoRegisterResponse.UserSub
            });
            
            await this.userRepository.save(user);

            return user;
        }
    
        public async login(email: string, password: string): Promise<{ user: User, token: string, refreshToken?: string }> {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error('Email or password is incorrect');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password!);
            if (!isPasswordValid) {
                throw new Error('Email or password is incorrect');
            }

            const loginCommand = new InitiateAuthCommand({
                AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
                ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password
                }
            })

            const cognitoLoginResponse = await this.cognitoClient.send(loginCommand);

            //const payload = { email: user.email, sub: user.id };
            //const token = await this.jwtService.signAsync(payload);
            const token = cognitoLoginResponse.AuthenticationResult!.AccessToken!;
            const refreshToken = cognitoLoginResponse.AuthenticationResult?.RefreshToken;

            user.password = undefined;

            return { user, token, refreshToken };
        }
        
}