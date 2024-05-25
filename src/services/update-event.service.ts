import Event from '../domain/models/Event';
import { UpdateEvent, UpdateEventModel } from '../domain/usecases/update-event';
import EventsRepository from '../repositories/events.repository';

class UpdateEventService implements UpdateEvent {
  private readonly eventRepository: EventsRepository;

  constructor(eventRepository: EventsRepository) {
    this.eventRepository = eventRepository;
  }

  async update(id: string, data: UpdateEventModel): Promise<Event> {
    return await this.eventRepository.update(id, data);
  }
}

export default UpdateEventService;
