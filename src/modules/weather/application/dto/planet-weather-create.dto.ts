import { IsNotEmpty, IsNumber, IsPositive, IsString, Matches } from "class-validator";

export class PlanetWeatherCreateDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[-+]?\d{1,2}(?:\.\d+)?,\s*[-+]?\d{1,3}(?:\.\d+)?$/, {
        message: 'location must be in "latitude, longitude" format (e.g. 64.14, -21.97)',
    })
    location: string;

    @IsNumber()
    temperature: number;

    @IsPositive()
    humidity: number;

    @IsString()
    @IsNotEmpty()
    planetName: string;

    @IsString()
    @IsNotEmpty()
    planetClimate: string;
}