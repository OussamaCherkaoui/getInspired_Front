export class Registration {
  id?:number;
  username?: string;
  nameEvent?: string;
  isConfirmed?: boolean;

  constructor(data?: Partial<Registration>) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.nameEvent = data.nameEvent;
      this.isConfirmed = data.isConfirmed;
    }
  }
}
