import Event from '../domain/models/Event';
import { AddEvent, AddEventModel } from '../domain/usecases/add-event';
import EventsRepository from '../repositories/events.repository';
import { InvalidParamError } from '../utils/errors/invalidParamError';
import { MissingParamError } from '../utils/errors/missingParamError';
import { parseDate } from '../utils/functions/utils';

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

    const formatedDate = parseDate(data.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (formatedDate < today)
      throw new InvalidParamError(
        'Data do evento deve ser maior que data atual',
        400,
      );

    return await this.eventsRepository.add(data);
  }
}

export default AddEventsService;
