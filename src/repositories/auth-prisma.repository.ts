import { PrismaClient, User } from '@prisma/client';

import { CreateUserDto } from '@/dtos/users.dto';
import { AuthRepository } from '@/interfaces/auth.repository';

export class PrismaAuthRepository implements AuthRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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
