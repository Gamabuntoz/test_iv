export class UpdateUserDto {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
  ) {}
}
