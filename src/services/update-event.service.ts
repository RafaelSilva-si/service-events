import Event from '../domain/models/Event';
import { UpdateEvent, UpdateEventModel } from '../domain/usecases/update-event';
import EventsRepository from '../repositories/events.repository';
import { InvalidParamError } from '../utils/errors/invalidParamError';
import { parseDate } from '../utils/functions/utils';

class UpdateEventService implements UpdateEvent {
  private readonly eventRepository: EventsRepository;

  constructor(eventRepository: EventsRepository) {
    this.eventRepository = eventRepository;
  }

  async update(id: string, data: UpdateEventModel): Promise<Event> {
    const existEvent = await this.eventRepository.getEventByID(id);
    if (!existEvent) throw new InvalidParamError('Evento Não Existe!', 409);

    const formatedDate = parseDate(data.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (formatedDate < today)
      throw new InvalidParamError(
        'Data do evento deve ser maior que data atual',
        400,
      );

    if (data.capacity < 1)
      throw new InvalidParamError('Capacidade deve ser maior que 1', 400);

    return await this.eventRepository.update(id, data);
  }
}

export default UpdateEventService;
