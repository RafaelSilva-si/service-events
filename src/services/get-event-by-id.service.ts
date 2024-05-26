import Event from '../domain/models/Event';
import { GetEventByID } from '../domain/usecases/get-event-by-id';
import EventsRepository from '../repositories/events.repository';

class GetEventByIDService implements GetEventByID {
  private readonly eventsRepository: EventsRepository;
  constructor(eventRepository: EventsRepository) {
    this.eventsRepository = eventRepository;
  }

  async getEventByID(id: string): Promise<Event | false> {
    return await this.eventsRepository.getEventByID(id);
  }
}

export default GetEventByIDService;
