import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';

import { JWT_SECRET } from '@/config/environment';
import { CreateUserDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { sign } from 'jsonwebtoken';

class AuthService {
  public users = new PrismaClient().user;

  public async signup(data: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({
      where: { email: data.email },
    });
    if (findUser)
      throw new HttpException(409, `This email ${data.email} already exists`);

    const hashedPassword = await hash(data.password, 10);
    const createUserData: Promise<User> = this.users.create({
      data: { ...data, password: hashedPassword },
    });

    return createUserData;
  }

  public async login(
    data: CreateUserDto,
  ): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.users.findUnique({
      where: { email: data.email },
    });
    if (!findUser)
      throw new HttpException(409, `This email ${data.email} was not found`);

    const isPasswordMatching: boolean = await compare(
      data.password,
      findUser.password,
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(data: User): Promise<User> {
    const findUser: User = await this.users.findFirst({
      where: { email: data.email, password: data.password },
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
