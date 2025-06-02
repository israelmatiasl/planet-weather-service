import { Module } from '@nestjs/common';
import { PlanetWeatherService } from './services/planet-weather.service';
import { SwapiClient } from './http/swapi.client';
import { WeatherClient } from './http/weather.client';
import { HttpModule } from '@nestjs/axios';
import { DynamoDBProvider } from './persistence/dynamodb.config';
import { PlanetWeatherRepository } from './persistence/planet-weather.repository';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        PlanetWeatherService,
        SwapiClient,
        WeatherClient,
        DynamoDBProvider,
        {
            provide: 'PlanetWeatherRepository',
            useClass: PlanetWeatherRepository,
        }
    ],
    exports: [
        PlanetWeatherService,
        SwapiClient,
        WeatherClient
    ]
})
export class InfrastructureModule {}