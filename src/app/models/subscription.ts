export class Subscription {
  id?: number;
  type: string | undefined;
  start_date: string|undefined;
  end_date: string|undefined;
  isConfirmed?:boolean;
  notification: string | undefined;
  idMembre: number | undefined;

    constructor(data?: Partial<Subscription>) {
    if (data) {
      this.id = data.id;
      this.type = data.type;
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.isConfirmed = data.isConfirmed;
      this.notification=data.notification;
      this.idMembre=data.idMembre;
    }
  }
}
