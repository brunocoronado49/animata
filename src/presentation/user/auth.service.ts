import { envs } from '../../config/envs';
import { userModel } from '../../data';
import { CustomError, LoginDto, RegisterDto, UserEntity } from '../../domain';
import { bcryptAdapter, JwtAdapter } from '../../helpers';
import { EmailService } from './email.service';

interface UserData {
  id: string;
  fullName: string;
  username: string;
  email: string;
  emailValidated: boolean;
  role: string[];
  img?: string | undefined;
}

interface UserAuthData {
  user: UserData;
  token: {};
}

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(
    registerUserDto: RegisterDto,
  ): Promise<UserAuthData> {
    const existsUser = await userModel.findOne({
      email: registerUserDto.email,
    });
    if (existsUser) throw CustomError.badRequest('Email already exists');

    try {
      const user = new userModel(registerUserDto);
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();
      await this.sendEmailValidationLink(user.email);

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token)
        throw CustomError.internalServerError('Error while create JWT');

      return { user: userEntity, token };
    } catch (error) {
      throw CustomError.internalServerError(
        `Error in register user service: ${error}`,
      );
    }
  }

  public async loginUser(loginUserDto: LoginDto): Promise<UserAuthData> {
    const user = await userModel.findOne({ email: loginUserDto.email });
    if (!user)
      throw CustomError.notFound(
        `User with email: ${loginUserDto.email} not found`,
      );

    const passMatch = bcryptAdapter.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passMatch) throw CustomError.unauthorized('Invalid password');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServerError('Error creating token');

    return {
      user: userEntity,
      token,
    };
  }

  private sendEmailValidationLink = async (email: string): Promise<boolean> => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServerError('Error creating token');

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email for ANIMATA</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'ANIMATA: Validate your email',
      htmlBody: html,
    };

    const isSent: boolean = await this.emailService.sendEmail(options);
    if (!isSent)
      throw CustomError.internalServerError('Error sending email validation');

    return true;
  };

  public validateEmail = async (token: string): Promise<boolean> => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized('Invalid token');

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServerError('Email not in token');

    const user = await userModel.findOne({ email });
    if (!user) throw CustomError.internalServerError('Email not exists');

    if (user.emailValidated) return true;

    user.emailValidated = true;
    await user.save();

    return true;
  };
}
