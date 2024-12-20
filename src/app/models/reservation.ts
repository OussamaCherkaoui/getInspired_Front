export class Reservation {
  id?: number;
  start_time?:Date;
  end_time?:Date;
  isConfirmed: boolean | undefined;
  idMembre?: number;
  idSpace?: number;
  name?:string;
  picture?:string;

  constructor(data?: Partial<Reservation>) {
    if (data) {
      this.id = data.id;
      this.start_time = data.start_time;
      this.end_time = data.end_time;
      this.isConfirmed = data.isConfirmed;
      this.idMembre = data.idMembre;
      this.idSpace = data.idSpace;
    }
  }
}
