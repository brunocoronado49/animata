import mongoose from 'mongoose';

export class MongoValidator {
  static isMongoId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
}
