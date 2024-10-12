export class Registration {
  id?:number;
  username?: string;
  nameEvent?: string;
  isConfirmed?: boolean;
  picture?:string;
  date?:string;

  constructor(data?: Partial<Registration>) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.nameEvent = data.nameEvent;
      this.isConfirmed = data.isConfirmed;
      this.picture=data.picture;
      this.date = data.date;
    }
  }
}
