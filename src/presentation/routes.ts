import { Router } from 'express';
import { OwnerRoutes } from './owner/owner.router';
import { UserRoutes } from './user/auth.routes';

export class AppRoutes {
  public static get routes(): Router {
    const router: Router = Router();

    // TODO: Integrar las ruras de pet
    router.use('/api/auth', UserRoutes.routes);
    router.use('/api/owner', OwnerRoutes.routes);

    return router;
  }
}
