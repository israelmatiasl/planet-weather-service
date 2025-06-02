import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { LocationUtil } from "../../../../shared/location.util";

@Injectable()
export class WeatherClient {
    constructor(
        private readonly httpService: HttpService
    ) {}
    
    public async getWeatherByLocation(latitude?: number, longitude?: number): Promise<any> {
    if (!latitude || !longitude) {
      const random = LocationUtil.getRandomLocation();
      latitude = random.lat;
      longitude = random.lon;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    const response = await firstValueFrom(this.httpService.get(url));
        
    if (response.status !== 200) {
        throw new Error(`Weather API error: ${response.status}`);
    }
    return response.data;
  }
}