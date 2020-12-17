import { Connection, Repository } from 'typeorm'
import { CategoryEntity, CategoryPostEntity, PostEntity, UserEntity } from '../entities'
import { name, internet, random, date, lorem, hacker } from 'faker'
import { writeFileSync } from 'fs';

const createUsers = async (connection: Connection, createPosts: (connection: Connection, users: Array<UserEntity>) => Promise<any>): Promise<void> => {
  const users: Array<UserEntity> = new Array();
  for (const _ of Array.from({ length: 100 })) {
    const firstName: string = name.firstName();
    const lastName: string = name.lastName();
    const password: string = internet.password();
    const email: string = internet.email();
    const isActive: boolean = random.arrayElement([true, false]);
    const birth: Date = date.past();
    const user: Partial<UserEntity> = new UserEntity(firstName, lastName, isActive, birth, password, email);
    users.push(await connection.manager.save(user) as UserEntity);
  }
  await createPosts(connection, users);
}

const createPosts = async (connection: Connection, users: Array<UserEntity>): Promise<void> => {
  const posts: Array<PostEntity> = new Array()
  for (const user of users) {
    const body: string = lorem.paragraph();
    const postA: Partial<PostEntity> = new PostEntity(body)
    const postB: Partial<PostEntity> = new PostEntity(body)
    postA.user = <UserEntity>user;
    postB.user = <UserEntity>user;
    posts.push(<PostEntity>await connection.manager.save(postA));
    posts.push(<PostEntity>await connection.manager.save(postB));
  }
  await manyToManyCreate(<Connection>connection, <Array<PostEntity>>posts)
}

const manyToManyCreate = async (connection: Connection, posts: Array<PostEntity>): Promise<void> => {
  await createCategories(<Connection>connection);
  const categoryRepository: Repository<CategoryEntity> = connection.getRepository(CategoryEntity);
  const categoryPostRepository: Repository<CategoryPostEntity> = connection.getRepository(CategoryPostEntity);
  const categories: Array<CategoryEntity> = await categoryRepository.find();
  for (const post of posts) {
    const someColumn: string = hacker.adjective()
    const categoryPost: CategoryPostEntity = new CategoryPostEntity(someColumn, post, random.arrayElement(categories))
    await categoryPostRepository.manager.save(<CategoryPostEntity>categoryPost)
  }
}

const createCategories = async (connection: Connection): Promise<void> => {
  const categoryRepository: Repository<CategoryEntity> = connection.getRepository(CategoryEntity);
  for (const _ of Array({ length: 100 })) {
    const label: string = hacker.verb();
    const category: Partial<CategoryEntity> = new CategoryEntity(label);
    await categoryRepository.manager.save(category as CategoryEntity)
  }
}

const readUsers = async (connection: Connection): Promise<void> => {
  const userRepository: Repository<UserEntity> = connection.getRepository(UserEntity);
  const users: Array<UserEntity> = await userRepository.find();
  const orders: Array<UserEntity> = await userRepository.find({
    order: { birth: 'ASC' },
    select: ['firstName', 'lastName']
  });
  const pagination: Array<UserEntity> = await userRepository.find({ take: 1, skip: 6 });
  const one: UserEntity = await userRepository.findOne(3);
  const filter: Array<UserEntity> = await userRepository.find({ where: {firstName: 'road'} });
  const relation: Array<UserEntity> = await userRepository.find({ relations: ['posts'] });
  writeFileSync(<string>'./json/data-relation.json', <string>JSON.stringify(relation as Array<UserEntity>, null as null, 2 as number));
}

export { createPosts, createUsers, readUsers }
