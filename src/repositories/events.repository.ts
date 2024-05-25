import Event from '../domain/models/Event';
import { AddEvent, AddEventModel } from '../domain/usecases/add-event';

class EventsRepository implements AddEvent {
  async add(data: AddEventModel): Promise<Event> {
    return { ...data, id: '1' };
  }
}

export default EventsRepository;
