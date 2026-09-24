import { regularExps } from '../../../helpers';

export class LoginDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(obj: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = obj;

    if (!email) return ['Missing email'];
    if (!password) return ['Missing password'];

    if (!regularExps.email.test(email)) return ['Email not valid'];
    if (password.length < 0) return ['Password to short'];

    return [undefined!, new LoginDto(email, password)];
  }
}
