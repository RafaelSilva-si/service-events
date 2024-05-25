import Event from '../models/Event';

export interface AddEventModel {
  title: string;
  date: string;
  description: string;
  capacity: number;
  category: string;
  status: string;
}

export interface AddEvent {
  add: (event: AddEventModel) => Promise<Event>;
}
