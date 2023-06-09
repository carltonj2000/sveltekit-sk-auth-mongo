import { Collection, MongoClient } from 'mongodb';
import type { Collection } from 'mongodb';
import type { User, UserWithoutId } from './types/user';
import type { registerFormData } from './types/form';
import bcrypt from 'bcrypt';
import { SECRET_URI } from '$env/static/private';

export const dbConn = async (): Promise<Collection> => {
  const client = new MongoClient(SECRET_URI);
  await client.connect();
  const dbName = 'AllUsers';
  const db = client.db(dbName);
  const collection = db.collection('users');
  return collection;
};

export const returnAllUsers = async (collection: Collection) => {
  const Users = await collection.find().toArray();
  //console.log("Result",Users);
  return Users;
};

export const returnAllURLOptions = async (collection: Collection) => {
  const projection = { _id: 0 };
  const Users = await collection.find().project(projection).toArray();
  return Users;
};

export const returnURLsList = async (
  collection: Collection
): Promise<string[]> => {
  const projection = { URL: 1, _id: 0 };
  const users = await collection.find().project(projection).toArray();
  const userList: string[] = users.map((user) => user.URL);
  return userList.sort();
};

export const returnEmailsList = async (
  collection: Collection
): Promise<string[]> => {
  const projection = { email: 1, _id: 0 };
  const users = await collection.find().project(projection).toArray();
  const emailList: string[] = users.map((user) => user.email.toString());
  return emailList;
};

export const registerUser = async (
  collection: Collection,
  user: UserWithoutId
) => {
  const register = await collection.insertOne(user);
  return register;
};

export const bulkAddUsers = async (
  collection: Collection,
  users: UserWithoutId[]
) => {
  const register = await collection.insertMany(users);
  return register;
};

export const deleteAll = async (collection: Collection) => {
  const deleteMany = await collection.deleteMany();
  return deleteMany;
};

export const findUserById = async (collection: Collection) => {
  const Users = await collection.find().toArray();
  //console.log("Result",Users);
  return Users;
};

export const findUserByUrl = async (collection: Collection, url: string) => {
  const User = await collection.find({ URL: url }).toArray();
  console.log('Result', User[0]);
  return JSON.parse(
    JSON.stringify(User[0], (key, value) =>
      key === '_id' ? value.toString(value) : value
    )
  );
};

export const findUserByEmail = async (
  collection: Collection,
  email: string
) => {
  const projection = { email: 1, _id: 0, password: 1 };
  const User = await collection
    .find({ email: email })
    .project(projection)
    .toArray();
  console.log('Email Find Result', User[0]);
  return JSON.parse(
    JSON.stringify(User[0], (key, value) =>
      key === '_id' ? value.toString(value) : value
    )
  );
};

export const findUserByEmailWithPassword = async (
  collection: Collection,
  email: string
) => {
  const projection = { email: 1, _id: 0, password: 1, URL: 1 };
  const User = await collection
    .find({ email: email })
    .project(projection)
    .toArray();
  console.log('Email Find Result', User[0]);
  return JSON.parse(
    JSON.stringify(User[0], (key, value) =>
      key === '_id' ? value.toString(value) : value
    )
  );
};

export const onUserStyledPage = (url: string) => {
  const nonUserStyledRoutes = ['', '/', '/signup', '/login'];
  return nonUserStyledRoutes.includes(url);
};

export const registerFormToUserWithoutId = async (
  form: registerFormData
): Promise<UserWithoutId> => {
  const hashedPassword = await bcrypt.hash(form.password, 12);
  const user = {
    URL: form.urlChoice as string,
    firstName: form.firstName.toString(),
    lastName: form.lastName.toString(),
    email: form.email.toString(),
    password: hashedPassword,
    options: {
      layout: 'top',
      carousel: false,
      hero: false,
      message: ''
    },
    palette: {
      primary: '#242424',
      secondary: '#FFFFFF',
      text: '#FFFFFF'
    },
    photos: []
  };

  return user;
};
