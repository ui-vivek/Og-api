import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { DbController } from './db.controller';
import { UsersService } from './db.service';

@Module({
  imports: [],
  controllers: [DbController],
  providers: [
    UsersService,
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          const client = await MongoClient.connect('mongodb://127.0.0.1');
          return client.db('mydb');
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
