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
      return await EventModel.find(params);
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async add(data: AddEventModel): Promise<Event> {
    try {
      const event = new EventModel({ ...data });
      return await event.save();
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async update(id: string, data: UpdateEventModel): Promise<Event> {
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedEvent;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async getEventByID(id: string): Promise<Event | false> {
    try {
      const event = await EventModel.findById(id);
      return event || false;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  async remove(id: string): Promise<Event> {
    try {
      const event = await EventModel.findById(id);
      if (event) {
        await EventModel.deleteOne({ _id: id });
        return event;
      }

      throw new DBError('Event not found', 404);
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default EventsRepository;
