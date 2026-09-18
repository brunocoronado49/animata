import { Response } from 'express';
import { CustomError } from '../domain';

export class HandleError {
  static handleError(
    error: unknown,
    res: Response,
  ): Response<any, Record<string, any>> {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
