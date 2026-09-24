import { MongoValidator } from '../../../helpers';

export class DeletePetDto {
  private constructor(public readonly id: string) {}

  static create(obj: { [key: string]: any }): [string?, DeletePetDto?] {
    const { id } = obj;

    if (!id) return ['Id is required'];
    if (!MongoValidator.isMongoId(id)) return ['Invalid ID format'];

    return [undefined!, new DeletePetDto(id)];
  }
}
