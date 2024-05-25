import Event from '../domain/models/Event';
import { AddEvent, AddEventModel } from '../domain/usecases/add-event';
import EventsRepository from '../repositories/events.repository';
import { MissingParamError } from '../utils/errors/missingParamError';

class AddEventsService implements AddEvent {
  private readonly eventsRepository: EventsRepository;

  constructor(eventsRepository: EventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  async add(data: AddEventModel): Promise<Event> {
    const requiredFields = [
      'title',
      'date',
      'location',
      'capacity',
      'category',
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new MissingParamError(field, 401);
      }
    }
    return await this.eventsRepository.add(data);
  }
}

export default AddEventsService;
