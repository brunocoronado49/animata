import { Router } from 'express';
import { OwnerRoutes } from './owner/owner.router';
import { PetRoutes } from './pet/pet.router';
import { UserRoutes } from './user/auth.routes';

export class AppRoutes {
  public static get routes(): Router {
    const router: Router = Router();

    router.use('/api/auth', UserRoutes.routes);
    router.use('/api/owner', OwnerRoutes.routes);
    router.use('/api/pet', PetRoutes.routes);

    return router;
  }
}
