import { petModel } from '../../data';
import {
  CreatePetDto,
  CustomError,
  DeletePetDto,
  PaginationDto,
  UpdatePetDto,
} from '../../domain';

export class PetService {
  constructor() {}

  public async createPet(createPetDto: CreatePetDto) {
    try {
      const pet = new petModel(createPetDto);

      await pet.save();

      return pet;
    } catch (error) {
      throw CustomError.internalServerError(`Error creating pet: ${error}`);
    }
  }

  public async getPets(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    try {
      const [total, pets] = await Promise.all([
        petModel.countDocuments(),
        petModel
          .find()
          .skip((page - 1) * limit)
          .populate('owner', 'fullName email phones'),
      ]);

      return {
        page,
        limit,
        total,
        pets: pets.map((pet) => {
          return { ...pet };
        }),
      };
    } catch (error) {
      throw CustomError.internalServerError(`Error get all pets: ${error}`);
    }
  }

  public async getPetById(id: string) {
    const pet = await petModel.findById(id);
    if (!pet) throw CustomError.notFound(`Pet with id "${id}" not found`);

    return pet;
  }

  public async updatePet(updatePetDto: UpdatePetDto) {
    const pet = await petModel.findById(updatePetDto.id);
    if (!pet)
      throw CustomError.notFound(`Pet with id "${updatePetDto.id}" not found`);

    try {
      const updatedPet = await petModel
        .findByIdAndUpdate(updatePetDto.id, updatePetDto.values, { new: true })
        .populate('owner', 'fullName email phones');

      return updatedPet;
    } catch (error) {
      throw CustomError.internalServerError(`Error updating pet: ${error}`);
    }
  }

  public async deletePet(deletePetDto: DeletePetDto) {
    const pet = await petModel.findById(deletePetDto.id);
    if (!pet) throw CustomError.notFound('Product not found');

    try {
      await petModel.findByIdAndDelete(deletePetDto.id);
      return {
        productId: deletePetDto.id,
        product: pet.name,
        message: 'Pet deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServerError(`Error deleting pet: ${error}`);
    }
  }
}
