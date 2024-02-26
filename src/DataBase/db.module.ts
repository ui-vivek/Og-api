import { Global, Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { DbController } from './db.controller';
import { DbService } from './db.service';
@Global()
@Module({
  imports: [],
  controllers: [DbController],
  providers: [
    DbService,
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
  exports: ['DATABASE_CONNECTION',DbService],
})
export class DatabaseModule {}
