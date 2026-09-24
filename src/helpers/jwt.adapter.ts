import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';

const jwt_seed: string = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(payload: any, duration: any = '2h') {
    return new Promise((resolve) => {
      jwt.sign(payload, jwt_seed, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, jwt_seed, (error, decoded) => {
        if (error) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
