import assert from 'assert';
import EventsRepository from '../../repositories/events.repository';
import RemoveEventService from '../../services/remove-event.service';
import Sinon from 'sinon';

const mocks = {
  returnSuccess: require('../mocks/return-success-event.json'),
};

describe('Remove Events', () => {
  const eventRepository = new EventsRepository();
  const removeEventService = new RemoveEventService(eventRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve remover um evento com base em seu ID', async () => {
    Sinon.stub(EventsRepository.prototype, 'getEventByID')
      .withArgs('1')
      .resolves(mocks.returnSuccess);

    Sinon.stub(EventsRepository.prototype, 'remove').resolves(
      mocks.returnSuccess,
    );
    const result = await removeEventService.remove('1');
    assert.deepEqual(result, mocks.returnSuccess);
  });

  it('Deve retornar um erro, caso o evento não exista', async () => {
    Sinon.stub(EventsRepository.prototype, 'getEventByID').resolves(false);

    const promise = removeEventService.remove('2');
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 409);
      assert.deepEqual(error.message, 'Missing param Esse evento não existe');
      return true;
    });
  });
});
