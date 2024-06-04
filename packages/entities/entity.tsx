export abstract class Entity {
  public Events: any[];

  constructor(events: any[]) {
    this.Events = events;
  }
}

export class Event {
  Value: any;
}
