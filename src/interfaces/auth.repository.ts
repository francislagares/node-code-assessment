import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@prisma/client';

export interface AuthRepository {
  getUserByEmail: (email: string) => Promise<User | null>;
  getUserByEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<User | null>;
  createUser: (data: CreateUserDto, hashedPassword: string) => Promise<User>;
}
