import { MongoValidator } from '../../../helpers';

export class DeleteOwnerDto {
  private constructor(public readonly id: string) {}

  static create(obj: { [key: string]: any }): [string?, DeleteOwnerDto?] {
    const { id } = obj;

    if (!id) return ['Id is required'];
    if (!MongoValidator.isMongoId(id)) return ['Invalid ID format'];

    return [undefined!, new DeleteOwnerDto(id)];
  }
}
