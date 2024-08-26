import {Role} from "./role";

export class User {
  id?:number;
  username: string | undefined;
  password: string|undefined;
  email: string|undefined;
  phone: string|undefined;
  role?:Role;

  constructor(data?: Partial<User>) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.password = data.password;
      this.email = data.email;
      this.phone = data.phone;
      this.role = data.role;
    }
  }
}
