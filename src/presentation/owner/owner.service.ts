import { ownerModel } from '../../data';
import {
  CreateOwnerDto,
  CustomError,
  DeleteOwnerDto,
  PaginationDto,
  UpdateOwnerDto,
} from '../../domain';

export class OwnerService {
  constructor() {}

  public async createOwner(createOwnerDto: CreateOwnerDto) {
    const ownerExists = await ownerModel.findOne({
      email: createOwnerDto.email,
    });
    if (ownerExists) throw CustomError.badRequest('Owner already exists');

    try {
      const owner = new ownerModel({
        ...createOwnerDto,
      });

      await owner.save();

      return {
        id: owner.id,
        data: owner,
      };
    } catch (error) {
      throw CustomError.internalServerError(`Error creating owner: ${error}`);
    }
  }

  public async updateOwner(updateOwnerDto: UpdateOwnerDto) {
    const owner = await ownerModel.findById(updateOwnerDto.id);
    if (!owner)
      throw CustomError.notFound(
        `Owner with id ${updateOwnerDto.id} not found`,
      );

    try {
      const updatedOwner = await ownerModel.findByIdAndUpdate(
        updateOwnerDto.id,
        updateOwnerDto.values,
        { new: true },
      );

      return updatedOwner;
    } catch (error) {
      throw CustomError.internalServerError(`Error updating owner: ${error}`);
    }
  }

  public async deleteOwner(deleteOwnerDto: DeleteOwnerDto) {
    const owner = await ownerModel.findById(deleteOwnerDto.id);
    if (!owner) throw CustomError.notFound('Owner not found');

    try {
      await ownerModel.findByIdAndDelete(deleteOwnerDto.id);
      return {
        ownerId: deleteOwnerDto.id,
        name: owner.fullName,
        message: 'Owner deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServerError(`Error deleting owner: ${error}`);
    }
  }

  public async getOwnerById(id: string) {
    const owner = await ownerModel.findById(id);
    if (!owner) throw CustomError.notFound('Owner not found');

    return owner;
  }

  public async getOwners(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, owners] = await Promise.all([
        ownerModel.countDocuments(),
        ownerModel
          .find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        page,
        limit,
        total,
        owners: owners.map((o) => {
          return { ...o };
        }),
      };
    } catch (error) {
      throw CustomError.internalServerError(`Internal server error: ${error}`);
    }
  }
}
