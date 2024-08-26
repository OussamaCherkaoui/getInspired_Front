export class SubscriptionHistory {
  id?: number;
  type: string | undefined;
  start_date: string|undefined;
  end_date: string|undefined;
  idSubscription: number | undefined;

  constructor(data?: Partial<SubscriptionHistory>) {
    if (data) {
      this.id = data.id;
      this.type = data.type;
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.idSubscription = data.idSubscription;
    }
  }
}
