import { Module } from "@nestjs/common";
import { UserRepository } from "./persistence/user.repository";
import { UserService } from "./services/user.service";
import { DynamoDBProvider } from "./persistence/dynamodb.config";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '10m' },
        }),
    ],
    providers: [
        UserService,
        DynamoDBProvider,
        {
            provide: 'UserRepository',
            useClass: UserRepository,
        }
    ],
    exports: [
        UserService
    ]
})
export class InfrastructureModule {}