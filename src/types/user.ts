import type { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId | string;
  URL: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photos: any[];
  options: Options;
  palette: Palette;
}
export interface UserWithoutId extends Omit<User, '_id'> { }

export interface Options {
  layout: string;
  carousel: boolean;
  hero: boolean;
  message: string;
}

export interface Palette {
  primary: string;
  secondary: string;
  text: string;
}
