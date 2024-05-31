import Event from '../models/Event';

export interface UpdateEventModel {
  title: string;
  date: string;
  description: string;
  capacity: number;
  category: string;
  status: string;
  cover: string;
  galerry: any;
  location: string;
  price: number;
}

export interface UpdateEvent {
  update: (id: string, event: UpdateEventModel) => Promise<Event>;
}
