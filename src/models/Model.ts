export class User {
  name: string;
  email: string;
  password: string;
  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
  }
}

export type LoginData = {
  email: string;
  password: string;
};

export type Mentor = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  about: string;
};
