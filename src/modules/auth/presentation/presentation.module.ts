import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { AuthController } from './controllers/auth.controller';
import { GuardModule } from 'src/shared/middleware/middleware.module';

@Module({
  imports: [
    ApplicationModule,
    GuardModule
  ],
  controllers: [
    AuthController
  ],
})
export class PresentationModule {}