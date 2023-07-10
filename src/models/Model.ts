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
