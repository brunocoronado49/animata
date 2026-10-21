import { Router } from 'express';
import { AuthMiddleware } from '../user/auth.middleware';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

export class PetRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const petService: PetService = new PetService();
    const petController: PetController = new PetController(petService);

    router.use(AuthMiddleware.validateJWT);

    router.get('/', petController.getPets);
    router.get('/:id', petController.getPetById);
    router.post('/', [AuthMiddleware.isVeterinario], petController.createPet);
    router.put('/:id', [AuthMiddleware.isVeterinario], petController.updatePet);
    router.delete(
      '/:id',
      [AuthMiddleware.isVeterinario],
      petController.deletePet,
    );

    return router;
  }
}
