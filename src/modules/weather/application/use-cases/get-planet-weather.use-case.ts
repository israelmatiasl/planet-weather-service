import { Injectable } from '@nestjs/common';
import { PlanetWeatherService } from '../../infrastructure/services/planet-weather.service';
import { PlanetWeatherDto } from '../dto/planet-weather.dto';

@Injectable()
export class GetPlanetWeatherUseCase {
  constructor(private readonly planetWeatherService: PlanetWeatherService) {}

  async execute(lat?: number, lon?: number): Promise<PlanetWeatherDto> {
    const planetWeather = await this.planetWeatherService.getFusedPlanetWeather(lat, lon);
    return {
      id: planetWeather.id,
      timestamp: planetWeather.timestamp,
      location: planetWeather.location,
      temperature: planetWeather.temperature,
      humidity: planetWeather.humidity,
      planet_name: planetWeather.planetName,
      planet_climate: planetWeather.planetClimate,
      match_score: planetWeather.matchScore,
    };
  }
}