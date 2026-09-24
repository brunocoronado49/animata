import mongoose from 'mongoose';

interface Options {
  mongoUri: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options): Promise<boolean> {
    const { mongoUri, dbName } = options;

    try {
      await mongoose.connect(mongoUri, { dbName });
      console.log('Mongodb connected successfully!');

      return true;
    } catch (error) {
      console.log('Mongodb connection error!');
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
