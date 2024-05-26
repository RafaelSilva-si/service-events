import Event from '../models/Event';

export interface GetAllEvents {
  getAll: (params: any) => Promise<Event[]>;
}
