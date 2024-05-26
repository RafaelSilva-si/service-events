import { NextFunction, Request, Response } from 'express';
import { AddEvent } from '../domain/usecases/add-event';
import { GetAllEvents } from '../domain/usecases/get-all-events';
import { GetEventByID } from '../domain/usecases/get-event-by-id';
import { RemoveEvent } from '../domain/usecases/remove-event';
import { UpdateEvent } from '../domain/usecases/update-event';

class EventsController {
  private readonly addEvent: AddEvent;
  private readonly updateEvent: UpdateEvent;
  private readonly removeEvent: RemoveEvent;
  private readonly getAllEvents: GetAllEvents;
  private readonly getEventByID: GetEventByID;

  constructor(
    addEvent: AddEvent,
    updateEvent: UpdateEvent,
    removeEvent: RemoveEvent,
    getAllEvents: GetAllEvents,
    getEventByID: GetEventByID,
  ) {
    this.addEvent = addEvent;
    this.updateEvent = updateEvent;
    this.removeEvent = removeEvent;
    this.getAllEvents = getAllEvents;
    this.getEventByID = getEventByID;
  }

  public add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.addEvent.add(req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
      res.status(error.statusCode || 500).send(error.message);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.updateEvent.update(req.params.id, req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
      res.status(error.statusCode || 500).send(error.message);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getAllEvents.getAll(req.params);
      res.status(200).send(result);
    } catch (error) {
      next(error);
      res.status(error.statusCode || 500).send(error.message);
    }
  };

  public getByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getEventByID.getEventByID(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      next(error);
      res.status(error.statusCode || 500).send(error.message);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.removeEvent.remove(req.params.id);
      res.status(201).send(result);
    } catch (error) {
      next(error);
      res.status(error.statusCode || 500).send(error.message);
    }
  };
}

export default EventsController;
