import { UserResponseDto } from "./user-response.dto";

export class SessionDto {
    user: UserResponseDto;
    token: string;
    refreshToken?: string;
}