import mongoose from 'mongoose';
import { env } from '../utils/env';

export const initMongoConnection = async (): Promise<void> => {
  try {
    const user: string = env('MONGODB_USER');
    const password: string = env('MONGODB_PASSWORD');
    const url: string = env('MONGODB_URL');
    const db: string = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!!!');
  } catch (error) {
    console.error('Mongo connection error:', error);
  }
};
