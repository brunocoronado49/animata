import { Request, Response } from 'express';
import {
  CreateOwnerDto,
  DeleteOwnerDto,
  PaginationDto,
  UpdateOwnerDto,
} from '../../domain';
import { HandleError } from '../../helpers';
import { OwnerService } from './owner.service';

export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  public createOwner = (req: Request, res: Response) => {
    
    const [error, createOwnerDto] = CreateOwnerDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.ownerService
      .createOwner(createOwnerDto!)
      .then((data) => res.status(201).json({ data }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public getOwnerById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.ownerService
      .getOwnerById(id as string)
      .then((data) => res.status(200).json({ data }))
      .catch((error) => HandleError.handleError(error, res));
  };

  public getOwners = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.params;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.ownerService
      .getOwners(paginationDto!)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public updateOwner = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateOwnerDto] = UpdateOwnerDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    this.ownerService
      .updateOwner(updateOwnerDto!)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => HandleError.handleError(err, res));
  };

  public deleteOwner = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, deleteOwnerDto] = DeleteOwnerDto.create({ id });

    if (error) return res.status(400).json({ error });

    this.ownerService
      .deleteOwner(deleteOwnerDto!)
      .then((result) => res.status(200).json({ result }))
      .catch((err) => HandleError.handleError(err, res));
  };
}
