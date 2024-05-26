import Event from '../domain/models/Event';
import { GetAllEvents } from '../domain/usecases/get-all-events';
import EventsRepository from '../repositories/events.repository';

class GetAllEventsService implements GetAllEvents {
  private readonly eventsRepository: EventsRepository;
  constructor(eventRepository: EventsRepository) {
    this.eventsRepository = eventRepository;
  }

  async getAll(params: any): Promise<Event[]> {
    return await this.eventsRepository.getAll(params);
  }
}

export default GetAllEventsService;
