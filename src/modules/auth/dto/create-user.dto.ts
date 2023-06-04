export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  roles: string[];
  organisation: string;
}
