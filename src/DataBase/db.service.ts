import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateUserDto } from './db.DTO';
import { UpdateUserDTO } from 'src/auth/dto/update-user.dto';
import { UserSignUpDTO } from 'src/auth/dto/user-sign-up.dto';

@Injectable()
export class DbService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}
  async create(body: CreateUserDto): Promise<void> {
    await this.db.collection('users').insertOne(body);
  }
  async addUser(body: UserSignUpDTO){
    return await this.db.collection('users').insertOne(body); // this will return the object ID of mongodb
  }
  async create1(body: CreateUserDto): Promise<void> {
    await this.db.collection('admin').insertOne(body);
  }
  async find(){
    return await this.db.collection('users').find().toArray();
  }

  async findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException;
    }

    const response = await this.db.collection('users').findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      throw new NotFoundException;
    }

    return response;
  }

  async findOneByEmail(userEmail: string) {
    const response = await this.db.collection('users').findOne({
      email: userEmail
    });
    if (!response) {
      return ({status: 404,data:{}, message:"User not found"});
    }
    return ({status: 200,data:response, message:"User found"});
  }
  async update(id: string, body: UpdateUserDTO): Promise<void> { //UpdateUserDto is missing
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException;
    }

    await this.db.collection('users').updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...body,
        },
      },
    );
  }

  async delete(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException;
    }

    const response = await this.db.collection('users').deleteOne({
      _id: new ObjectId(id),
    });

    if (response.deletedCount === 0) {
      throw new NotFoundException;
    }
  }
}
