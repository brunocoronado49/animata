import { Request, Response } from 'express';
import {
  CreatePetDto,
  DeletePetDto,
  PaginationDto,
  UpdatePetDto,
} from '../../domain';
import { HandleError } from '../../helpers';
import { PetService } from './pet.service';

export class PetController {
  constructor(private readonly petService: PetService) {}

  public createPet = (req: Request, res: Response) => {
    const [error, createPetDto] = CreatePetDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.petService
      .createPet(createPetDto!)
      .then((data) => res.status(201).json({ data }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public getPets = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.params;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.petService
      .getPets(paginationDto!)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public getPetById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.petService
      .getPetById(id as string)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public updatePet = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updatePetDto] = UpdatePetDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    this.petService
      .updatePet(updatePetDto!)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public deletePet = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, deletePetDto] = DeletePetDto.create({ id });

    if (error) return res.status(400).json({ error });

    this.petService
      .deletePet(deletePetDto!)
      .then((result) => res.status(200).json({ result }))
      .catch((err) => HandleError.handleError(err, res));
  };
}
