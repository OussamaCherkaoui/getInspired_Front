export class EventRegistration {
  id?: number;
  isConfirmed: boolean | undefined;
  idMembre?: number;
  idEvent?: number;


  constructor(data?: Partial<EventRegistration>) {
    if (data) {
      this.id = data.id;
      this.isConfirmed = data.isConfirmed;
      this.idMembre = data.idMembre;
      this.idEvent = data.idEvent;
    }
  }
}
