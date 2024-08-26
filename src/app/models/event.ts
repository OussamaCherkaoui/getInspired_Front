export class Event {
  id?: number;
  name: string | undefined;
  description: string|undefined;
  date: string | undefined;
  picture: string | undefined;


  constructor(data?: Partial<Event>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.date = data.date;
      this.picture = data.picture;
    }
  }
}
