import Event from '../models/Event';

export interface RemoveEvent {
  remove: (id: string) => Promise<Event>;
}
