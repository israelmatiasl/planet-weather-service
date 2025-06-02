import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { PlanetWeatherController } from './controllers/planet-weather.controller';

@Module({
  imports: [
    ApplicationModule
  ],
  controllers: [
    PlanetWeatherController
  ],
})
export class PresentationModule {}