import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from '../../domain';
import { HandleError } from '../../helpers';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.status(201).json({ user }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.status(200).json({ user }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService
      .validateEmail(token as string)
      .then(() =>
        res.status(200).json({ message: 'Email validated successfully' }),
      )
      .catch((err) => HandleError.handleError(err, res));
  };
}
