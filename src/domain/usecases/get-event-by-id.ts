import Event from '../models/Event';

export interface GetEventByID {
  getEventByID: (id: string) => Promise<Event | false>;
}
