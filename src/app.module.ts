import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [
    WeatherModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
