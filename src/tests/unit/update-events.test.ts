import assert from 'assert';
import UpdateEventService from '../../services/update-event.service';
import EventsRepository from '../../repositories/events.repository';
import Sinon from 'sinon';

const mocks = {
  returnSuccess: require('../mocks/return-success-event.json'),
};

describe('Update Event', () => {
  const eventRepository = new EventsRepository();
  const updateEvent = new UpdateEventService(eventRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve atualizar todas informações do evento verificando pelo ID.', async () => {
    Sinon.stub(EventsRepository.prototype, 'getEventByID')
      .withArgs('1')
      .resolves(mocks.returnSuccess);

    Sinon.stub(EventsRepository.prototype, 'update').resolves(
      mocks.returnSuccess,
    );

    const data = {
      title: 'Evento de programação',
      date: '2024-06-24',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
      cover:
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
      galerry: [
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_1280.jpg',
      ],
      price: 100,
      location: 'Expo SP',
    };

    const result = await updateEvent.update('1', data);
    assert.deepEqual(result, mocks.returnSuccess);
  });

  it('Deve retornar um erro se o evento não existir com base no ID', async () => {
    Sinon.stub(EventsRepository.prototype, 'getEventByID').resolves(false);
    const data = {
      title: 'Evento de programação',
      date: '2024-06-24',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
      cover:
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
      galerry: [
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_1280.jpg',
      ],
      price: 100,
      location: 'Expo SP',
    };

    const promise = updateEvent.update('1', data);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 409);
      assert.deepEqual(error.message, 'Invalid param Evento Não Existe!');
      return true;
    });
  });

  it('Deve retornar erro se data do evento for menor que data atual.', async () => {
    Sinon.stub(EventsRepository.prototype, 'getEventByID').resolves(
      mocks.returnSuccess,
    );

    const data = {
      title: 'Evento de programação',
      date: '2024-01-24',
      location: 'Expo SP',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
      cover:
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
      galerry: [
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_1280.jpg',
      ],
      price: 100,
    };

    const promise = updateEvent.update('1', data);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 400);
      assert.deepEqual(
        error.message,
        'Invalid param Data do evento deve ser maior que data atual',
      );
      return true;
    });
  });

  it('Deve retornar erro se capacidade for menor ou igual a 0', async () => {
    Sinon.stub(EventsRepository.prototype, 'getEventByID').resolves(
      mocks.returnSuccess,
    );

    const data = {
      title: 'Evento de programação',
      date: '2024-06-24',
      capacity: -1,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
      cover:
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
      galerry: [
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_1280.jpg',
      ],
      price: 100,
      location: 'Expo SP',
    };

    const promise = updateEvent.update('1', data);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 400);
      assert.deepEqual(
        error.message,
        'Invalid param Capacidade deve ser maior que 1',
      );
      return true;
    });
  });
});
