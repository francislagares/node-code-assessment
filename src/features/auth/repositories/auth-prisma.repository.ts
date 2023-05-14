import { CreateUserDto } from '@/features/auth/dtos/users.dto';
import { AuthRepository } from '@/features/auth/interfaces/auth.repository';
import { database } from '@/libs/shared/prisma/prisma';
import { User } from '@prisma/client';

export class PrismaAuthRepository implements AuthRepository {
  private readonly prisma: typeof database;

  constructor() {
    this.prisma = database;
  }

  public async getUserById(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        where: { email, password },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async createUser(
    data: CreateUserDto,
    hashedPassword: string,
  ): Promise<User> {
    return await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }
}
