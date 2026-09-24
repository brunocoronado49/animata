import { Router } from 'express';
import { UserRoutes } from './user/auth.routes';

export class AppRoutes {
  public static get routes(): Router {
    const router: Router = Router();

    // TODO: Integrar las ruras de pet, owner
    router.use('/api/auth', UserRoutes.routes);

    return router;
  }
}
