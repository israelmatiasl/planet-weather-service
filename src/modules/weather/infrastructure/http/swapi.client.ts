import https from 'https';
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class SwapiClient {
    constructor(
        private readonly httpService: HttpService
    ) {}

    public async getPlanetById(planetId: number): Promise<any> {
        const url = `https://swapi.dev/api/planets/${planetId}/`;
        const response = await firstValueFrom(this.httpService.get(url, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        }));
        
        if (response.status !== 200) {
            throw new Error(`SWAPI error: ${response.status}`);
        }
        return response.data;
    }

}