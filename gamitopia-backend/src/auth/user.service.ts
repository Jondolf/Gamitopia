import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly user: User;

  constructor() {
    this.user = {
      userId: 1,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    };
  }

  async findUser(): Promise<User | undefined> {
    return this.user;
  }
}
