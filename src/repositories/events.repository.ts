import Event from '../domain/models/Event';
import { AddEvent, AddEventModel } from '../domain/usecases/add-event';
import { GetAllEvents } from '../domain/usecases/get-all-events';
import { GetEventByID } from '../domain/usecases/get-event-by-id';
import { RemoveEvent } from '../domain/usecases/remove-event';
import { UpdateEvent, UpdateEventModel } from '../domain/usecases/update-event';
import DBError from '../utils/errors/dbError';
import EventModel from '../data/models/Events';

class EventsRepository
  implements AddEvent, UpdateEvent, GetEventByID, RemoveEvent, GetAllEvents
{
  async getAll(params: any): Promise<Event[]> {
    try {
      return await EventModel.findAll({ where: { ...params } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async add(data: AddEventModel): Promise<Event> {
    try {
      return (await EventModel.create({ ...data })).dataValues;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async update(id: string, data: UpdateEventModel): Promise<Event> {
    try {
      const result = await EventModel.update(data, {
        where: { id },
        returning: true,
      });
      return result[1][0].dataValues;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async getEventByID(id: string): Promise<Event | false> {
    try {
      return EventModel.findOne({ where: { id } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async remove(id: string): Promise<Event> {
    try {
      const existItem = await EventModel.findOne({ where: { id } });
      if (existItem) existItem.destroy();

      return existItem;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default EventsRepository;
