import Event from '../domain/models/Event';
import { RemoveEvent } from '../domain/usecases/remove-event';
import EventsRepository from '../repositories/events.repository';
import { MissingParamError } from '../utils/errors/missingParamError';

class RemoveEventService implements RemoveEvent {
  private readonly eventRepository: EventsRepository;
  constructor(eventRepository: EventsRepository) {
    this.eventRepository = eventRepository;
  }

  async remove(id: string): Promise<Event> {
    const existEvent = await this.eventRepository.getEventByID(id);
    if (!existEvent) throw new MissingParamError('Esse evento não existe', 409);

    return await this.eventRepository.remove(id);
  }
}

export default RemoveEventService;
