import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateUserDto } from './db.DTO';
import { UpdateUserDTO } from 'src/auth/dto/update-user.dto';
import { UserSignUpDTO } from 'src/auth/dto/user-sign-up.dto';
import { CreateOrderDTO } from 'src/orders/dto/create-order.dto';

@Injectable()
export class DbService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  //--------------------------------  Users --------------------------------

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

  async findUserById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException;
    }

    const response = await this.db.collection('users').findOne({
      _id: new ObjectId(),
    });

    if (!response) {
      return ({status: 404,data:{}, message:"User not found"});
    }

    return ({status: 200,data:response, message:"User found"});
  }

  async findUserByEmail(userEmail: string) {
    const user =  await this.db.collection('users').findOne({
      email: userEmail
    });
    if(!user) {
      return ({status: 404,data:{}, message:"User not found"});
    }
    return ({status: 200,data:user, message:"User found"});
    
  }
  async updateUserById(id: string, body: UpdateUserDTO): Promise<void> { //UpdateUserDto is missing
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
  async updateUserByEmail(email: string, body: UpdateUserDTO) {
    let updatedUser = await this.db.collection('users').updateOne(
      {
        email: email,
      },
      {
        $set: {
          ...body,
          updatedOn: Date.now(),
        },
      },
    );
    if (!updatedUser.acknowledged) {
      return ({status: 404,data:{}, message:"User not found"});
    }
    return ({status: 200,data:{}, message:"User updated"});
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

  //--------------------------------  Orders --------------------------------

  async findById(id: ObjectId): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException;
    }
    const response = await this.db.collection('oders').findOne({
      _id: new ObjectId(id),
    });
  }

  async addOrder(order:CreateOrderDTO){
    return await this.db.collection('oders').insertOne(order); // this will return the object ID of mongodb
  }

  async updateOrder(){
    
  }
  async allCanceledOdrders(){
    return await this.db.collection('oders').find({isDeleted:true}).toArray();
  }
  async getAllOrder(userId:string){
    let responce =  await this.db.collection('oders').find({
      userID : userId
    }).toArray();
    if(!responce.length){
      return ({status: 404,data:{}, message:"Orders not found"});
    }
    return ({status: 200,data:responce, message:"Orders found"});
  }
}
