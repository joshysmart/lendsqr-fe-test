import Dexie, { Table } from 'dexie';

export interface Admin {
  id?: number;
  email: string;
  password: string;
}

export interface Users {
  id?: number,
  user: object
}

export class MySubClassedDexie extends Dexie {
  admin!: Table<Admin>;
  users!: Table<Users>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      admin: '++id, email, passsword', // Primary key and indexed props
      users: `++id, user`
    });
  }
}


export const db = new MySubClassedDexie();