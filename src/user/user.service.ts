import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findUserByEmail(email) {
    // return this.users.find(user=>user.email===email)
  }
  findUserById(id) {
    // return this.users.find(user=>user.id===id)
  }
  validateToken(token) { //TODO: check if token is valid and return the user or not 
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
}
