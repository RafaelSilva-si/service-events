import Event from '../domain/models/Event';
import { RemoveEvent } from '../domain/usecases/remove-event';
import EventsRepository from '../repositories/events.repository';

class RemoveEventService implements RemoveEvent {
  private readonly eventRepository: EventsRepository;
  constructor(eventRepository: EventsRepository) {
    this.eventRepository = eventRepository;
  }

  async remove(id: string): Promise<Event> {
    return await this.eventRepository.remove(id);
  }
}

export default RemoveEventService;
