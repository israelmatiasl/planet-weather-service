import { Module } from '@nestjs/common';
import { GetPlanetWeatherUseCase } from './use-cases/get-planet-weather.use-case';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreatePlanetWeatherUseCase } from './use-cases/create-planet-weather.use-case';
import { GetAllPlanetWeatherUseCase } from './use-cases/get-all-planet-weather.use-case';

@Module({
    imports: [
        InfrastructureModule
    ],
    providers: [
        GetPlanetWeatherUseCase,
        CreatePlanetWeatherUseCase,
        GetAllPlanetWeatherUseCase
    ],
    exports: [
        GetPlanetWeatherUseCase,
        CreatePlanetWeatherUseCase,
        GetAllPlanetWeatherUseCase
    ]
})
export class ApplicationModule {}