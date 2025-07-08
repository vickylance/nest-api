import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'john',
      role: 'ADMIN',
      email: 'j@j.com',
    },
    {
      id: 2,
      name: 'jane',
      role: 'ENGINEER',
      email: 'j@j.com',
    },
    {
      id: 3,
      name: 'joe',
      role: 'INTERN',
      email: 'j@j.com',
    },
    {
      id: 4,
      name: 'jim',
      role: 'ENGINEER',
      email: 'j@j.com',
    },
    {
      id: 5,
      name: 'jill',
      role: 'INTERN',
      email: 'j@j.com',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const usersByRole = this.users.filter((user) => user.role === role);
      if (!usersByRole) throw new NotFoundException('Users by role not found');
      return usersByRole;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users = [...this.users, newUser];
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    if (!removedUser) {
      throw new NotFoundException('User not found');
    }
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
