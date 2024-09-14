export class Space {
  id?: number;
  name: string | undefined;
  description: string|undefined;
  price_per_day: number | undefined;
  picture: string | undefined;
  isReserved?:boolean;


  constructor(data?: Partial<Space>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.price_per_day = data.price_per_day;
      this.picture = data.picture;
      this.isReserved=data.isReserved;
    }
  }
}
