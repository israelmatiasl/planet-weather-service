import { PlanetWeatherDto } from "./planet-weather.dto";

export class PlanetWeatherListDto {
  items: PlanetWeatherDto[];
  lastKey?: Record<string, any>;
  lastKeyString?: string;
}