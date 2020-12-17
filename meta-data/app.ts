import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import { UserEntity, PostEntity, CategoryEntity, CategoryPostEntity } from './entities'
import { createUsers, createPosts, readUsers } from './crud'
import { CustomLogger } from './logger';

// typeorm: node --require ts-node/register ./node_modules/typeorm/cli.js
// typeorm:migrate: npm run typeorm migration:generate -- -n
// typeorm:run: npm run typeorm migrations:run

!async function() {
  const connection: Connection = await createConnection({
    type: 'sqlite',
    database: './db/testing-typeorm.db',
    entities: [UserEntity, PostEntity, CategoryEntity, CategoryPostEntity],
    logging: true,
    logger: new CustomLogger()
  }).catch(err => err);

  await connection.synchronize(<boolean>true);
  await createUsers(<Connection>connection, createPosts as (c: Connection, u: Array<UserEntity>) => Promise<any>)
  await readUsers(<Connection>connection);
}();
