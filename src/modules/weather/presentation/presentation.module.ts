import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { PlanetWeatherController } from './controllers/planet-weather.controller';
import { GuardModule } from 'src/shared/middleware/middleware.module';

@Module({
  imports: [
    ApplicationModule,
    GuardModule
  ],
  controllers: [
    PlanetWeatherController
  ],
})
export class PresentationModule {}