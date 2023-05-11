import { CreateUserDto, LoginUserDto } from '@/dtos/users.dto';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { compare, hash } from 'bcrypt';

import { HttpException } from '@/exceptions/httpException';
import { JWT_SECRET } from '@/config/environment';
import { PrismaAuthRepository } from '@/repositories/auth-prisma.repository';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

class AuthService {
  private authRepository = new PrismaAuthRepository();

  public async signup(data: CreateUserDto): Promise<User> {
    const findUser: User = await this.authRepository.getUserByEmail(data.email);

    if (findUser)
      throw new HttpException(409, `This email ${data.email} already exists`);

    const hashedPassword = await hash(data.password, 10);
    const createUserData: Promise<User> = this.authRepository.createUser(
      data,
      hashedPassword,
    );
    return createUserData;
  }

  public async login(
    data: LoginUserDto,
  ): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.authRepository.getUserByEmail(data.email);

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
    const { email, password } = data;

    const findUser: User = await this.authRepository.getUserByEmailAndPassword(
      email,
      password,
    );
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
