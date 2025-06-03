export class UserResponseDto {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;

  constructor(data?: Partial<UserResponseDto>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.lastName = data.lastName;
      this.email = data.email;
    }
  }

  static fromJson(json: Record<string, any>): UserResponseDto {
    return new UserResponseDto({
      id: json.id,
      name: json.name,
      lastName: json.lastName,
      email: json.email
    });
  }
}