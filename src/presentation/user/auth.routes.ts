import { Router } from 'express';
import { envs } from '../../config/envs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';

export class UserRoutes {
  static get routes(): Router {
    const router: Router = Router();

    const emailService: EmailService = new EmailService(
      {
        mailerEmail: envs.MAILER_EMAIL,
        mailerSecretKey: envs.MAILER_SECRET_KEY,
        mailerServise: envs.MAILER_SERVICE,
      },
      envs.SEND_EMAIL,
    );
    const authService: AuthService = new AuthService(emailService);
    const authController: AuthController = new AuthController(authService);

    router.post('/login', authController.loginUser);
    router.post('/register', authController.registerUser);
    router.get('/validate-email/:token', authController.validateEmail);

    return router;
  }
}
