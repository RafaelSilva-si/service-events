import Event from '../models/Event';

export interface UpdateEventModel {
  title: string;
  date: string;
  description: string;
  capacity: number;
  category: string;
  status: string;
}

export interface UpdateEvent {
  add: (id: string, event: UpdateEventModel) => Promise<Event>;
}
