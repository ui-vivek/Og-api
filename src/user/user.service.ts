import { Injectable } from '@nestjs/common';
import { DbService } from 'src/DataBase/db.service';

@Injectable()
export class UserService {
  constructor(private _dbService: DbService) {}
  async findUserByEmail(email) {
    try {
      return await this._dbService.findOneByEmail(email);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  findUserById(id) {
    // return this.users.find(user=>user.id===id)
  }
  findByUsername(username) {
    // return this.users.find(user=>user.username===username)
    // return {username:"singh"}
    return false;
  }
  findById(id) {
    console.log('========', id);
    return 'user_found';
  }
  checkUser(user) {} // check if user already exists before signup
  validateToken(token) {
    //TODO: check if token is valid and return the user or not
    return {
      firstName: 'John',
      lastName: 'Doe',
      username: 'jdoe123',
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      },
      phone: '555-1212',
      website: 'www.johndoe.com',
    };
  }

  create(createUserDto) {
    return {
      userId: '_userId',
      firstName: 'John',
      lastName: 'Doe',
      username: 'jdoe123',
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      },
      phone: '555-1212',
      website: 'www.johndoe.com',
    };
  }
}
