import { CustomError } from '../errors/custom.error';

export class UserEntity {
  constructor(
    public id: string,
    public fullName: string,
    public username: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
  ) {}

  static fromObject(obj: { [key: string]: any }): UserEntity {
    const {
      id,
      _id,
      fullName,
      username,
      email,
      emailValidated,
      password,
      role,
    } = obj;

    if (!_id && !id) {
      throw CustomError.badRequest('Missing ID');
    }

    if (!fullName) throw CustomError.badRequest('Missing name');
    if (!username) throw CustomError.badRequest('Missing username');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!password) throw CustomError.badRequest('Missing password');
    if (!role) throw CustomError.badRequest('Missing role/s');
    if (emailValidated === undefined)
      throw CustomError.badRequest('Missinf email validated');

    return new UserEntity(
      id || _id,
      fullName,
      username,
      email,
      emailValidated,
      password,
      role,
    );
  }
}
