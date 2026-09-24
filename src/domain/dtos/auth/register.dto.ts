import { regularExps } from '../../../helpers';

export class RegisterDto {
  constructor(
    public readonly fullName: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string[],
  ) {}

  static create(obj: { [key: string]: any }): [string?, RegisterDto?] {
    const { fullName, username, email, password, role = ['VETERINARIO'] } = obj;

    if (!fullName) return ['Missing full name'];
    if (!username) return ['username'];

    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];

    if (!password) return ['Missing password'];
    if (password.length < 0) return ['Password to short'];

    if (!Array.isArray(role)) return ['Role must be an array of string'];

    return [
      undefined!,
      new RegisterDto(fullName, username, email, password, role),
    ];
  }
}
