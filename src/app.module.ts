import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherModule } from './modules/weather/weather.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    WeatherModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
