import Event from '../domain/models/Event';
import { AddEvent, AddEventModel } from '../domain/usecases/add-event';
import { UpdateEvent, UpdateEventModel } from '../domain/usecases/update-event';

class EventsRepository implements AddEvent, UpdateEvent {
  async add(data: AddEventModel): Promise<Event> {
    return { ...data, id: '1' };
  }

  async update(id: string, data: UpdateEventModel): Promise<Event> {
    return { id, ...data };
  }
}

export default EventsRepository;
