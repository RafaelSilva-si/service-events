import Event from '../domain/models/Event';
import { AddEvent, AddEventModel } from '../domain/usecases/add-event';
import EventsRepository from '../repositories/events.repository';

class AddEventsService implements AddEvent {
  private readonly eventsRepository: EventsRepository;

  constructor(eventsRepository: EventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  async add(data: AddEventModel): Promise<Event> {
    return await this.eventsRepository.add(data);
  }
}

export default AddEventsService;
