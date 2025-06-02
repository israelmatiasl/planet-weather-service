import { Injectable } from '@nestjs/common';
import { PlanetWeatherService } from '../../infrastructure/services/planet-weather.service';
import { PlanetWeatherDto } from '../dto/planet-weather.dto';

@Injectable()
export class CreatePlanetWeatherUseCase {
  constructor(private readonly planetWeatherService: PlanetWeatherService) {}

  async execute(planetWeather): Promise<PlanetWeatherDto> {
    const createdPlanetWeather = await this.planetWeatherService.savePlanetWeather(planetWeather);
    return {
      id: createdPlanetWeather.id,
      timestamp: createdPlanetWeather.timestamp,
      location: createdPlanetWeather.location,
      temperature: createdPlanetWeather.temperature,
      humidity: createdPlanetWeather.humidity,
      planet_name: createdPlanetWeather.planetName,
      planet_climate: createdPlanetWeather.planetClimate,
      match_score: createdPlanetWeather.matchScore,
    };
  }
}