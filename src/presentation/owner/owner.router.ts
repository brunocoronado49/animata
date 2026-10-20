import { Router } from 'express';
import { AuthMiddleware } from '../user/auth.middleware';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

export class OwnerRoutes {
  static get routes(): Router {
    const router: Router = Router();

    const ownerService = new OwnerService();
    const ownerController = new OwnerController(ownerService);

    router.use(AuthMiddleware.validateJWT);

    router.get('/', ownerController.getOwners);
    router.get('/:id', ownerController.getOwnerById);
    router.post(
      '/',
      [AuthMiddleware.isVeterinario],
      ownerController.createOwner,
    );
    router.put(
      '/:id',
      [AuthMiddleware.isVeterinario],
      ownerController.updateOwner,
    );
    router.delete(
      '/:id',
      [AuthMiddleware.isVeterinario],
      ownerController.deleteOwner,
    );

    return router;
  }
}
