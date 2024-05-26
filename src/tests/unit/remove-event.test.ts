import assert from 'assert';
import EventsRepository from '../../repositories/events.repository';
import RemoveEventService from '../../services/remove-event.service';

const mocks = {
  returnSuccess: require('../mocks/return-success-event.json'),
};

describe('Remove Events', () => {
  const eventRepository = new EventsRepository();
  const removeEventService = new RemoveEventService(eventRepository);

  it('Deve remover um evento com base em seu ID', async () => {
    const result = await removeEventService.remove('1');
    assert.deepEqual(result, mocks.returnSuccess);
  });
});
