import Event from '../domain/models/Event';
import { UpdateEvent, UpdateEventModel } from '../domain/usecases/update-event';
import EventsRepository from '../repositories/events.repository';
import { InvalidParamError } from '../utils/errors/invalidParamError';

class UpdateEventService implements UpdateEvent {
  private readonly eventRepository: EventsRepository;

  constructor(eventRepository: EventsRepository) {
    this.eventRepository = eventRepository;
  }

  async update(id: string, data: UpdateEventModel): Promise<Event> {
    const existEvent = await this.eventRepository.getEventByID(id);
    if (!existEvent) throw new InvalidParamError('Evento Não Existe!', 409);

    return await this.eventRepository.update(id, data);
  }
}

export default UpdateEventService;
