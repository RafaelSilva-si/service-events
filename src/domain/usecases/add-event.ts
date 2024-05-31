import Event from '../models/Event';

export interface AddEventModel {
  title: string;
  date: string;
  description: string;
  capacity: number;
  category: string;
  status: string;
  cover: string;
  galerry: any;
  price: number;
  location: string;
}

export interface AddEvent {
  add: (event: AddEventModel) => Promise<Event>;
}
