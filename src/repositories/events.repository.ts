import Event from '../domain/models/Event';
import { AddEvent, AddEventModel } from '../domain/usecases/add-event';
import { GetEventByID } from '../domain/usecases/get-event-by-id';
import { RemoveEvent } from '../domain/usecases/remove-event';
import { UpdateEvent, UpdateEventModel } from '../domain/usecases/update-event';

class EventsRepository
  implements AddEvent, UpdateEvent, GetEventByID, RemoveEvent
{
  async add(data: AddEventModel): Promise<Event> {
    return { ...data, id: '1' };
  }

  async update(id: string, data: UpdateEventModel): Promise<Event> {
    return { id, ...data };
  }

  async getEventByID(id: string): Promise<Event | false> {
    return {
      id: id,
      title: 'Teste',
      capacity: 2,
      description: 'Evento Maneiro',
      category: 'Tecnologia',
      date: '25-05-2024',
      status: 'ativo',
    };
  }

  async remove(id: string): Promise<Event> {
    return {
      id: id,
      title: 'Teste',
      capacity: 2,
      description: 'Evento Maneiro',
      category: 'Tecnologia',
      date: '25-05-2024',
      status: 'ativo',
    };
  }
}

export default EventsRepository;
