import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'libs/entities/src/user.entity';

// import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  // ) {}

  async findAll(): Promise<User[]> {
    // return this.usersRepository.find();
    const users: User[] = [
      {
        id: 1,
        name: 'eleanor',
        email: 'eleanor@naver.com',
      },
      {
        id: 2,
        name: 'tom',
        email: 'tom@naver.com',
      },
      {
        id: 3,
        name: 'jack',
        email: 'jack@naver.com',
      },
    ];

    const convertedUsers = plainToInstance(User, users);

    return convertedUsers;
  }

  // findOne(id: number): Promise<User> {
  //   return this.usersRepository.findOne({ where: { id } });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
