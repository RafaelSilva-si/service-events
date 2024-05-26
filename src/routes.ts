import { Router } from 'express';
import EventsRepository from './repositories/events.repository';
import AddEventsService from './services/add-events.service';
import UpdateEventService from './services/update-event.service';
import GetAllEventsService from './services/get-all-events.service';
import GetEventByIDService from './services/get-event-by-id.service';
import RemoveEventService from './services/remove-event.service';
import EventsController from './controllers/events.controller';

const router = Router();
const eventsRepository = new EventsRepository();
const addEventsService = new AddEventsService(eventsRepository);
const updateEventsService = new UpdateEventService(eventsRepository);
const getAllEventsService = new GetAllEventsService(eventsRepository);
const getEventByIDService = new GetEventByIDService(eventsRepository);
const removeEventService = new RemoveEventService(eventsRepository);

const eventController = new EventsController(
  addEventsService,
  updateEventsService,
  removeEventService,
  getAllEventsService,
  getEventByIDService,
);

router.get('/', eventController.getAll);
router.get('/:id', eventController.getByID);
router.post('/', eventController.add);
router.patch('/', eventController.update);
router.delete('/', eventController.remove);

export default router;
