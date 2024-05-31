import assert from 'assert';
import AddEventsService from '../../services/add-events.service';
import EventsRepository from '../../repositories/events.repository';
import Sinon from 'sinon';

const mocks = {
  returnSuccess: require('../mocks/return-success-event.json'),
};

describe('Add Events', () => {
  const eventsRepository = new EventsRepository();
  const addEventsService = new AddEventsService(eventsRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve adicionar um Evento com os dados Titulo, Data, Local, Capacidade, Descrição, Categoria e status', async () => {
    Sinon.stub(EventsRepository.prototype, 'add').resolves(mocks.returnSuccess);

    const data = {
      title: 'Evento de programação',
      date: '2024-06-29',
      cover:
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
      galerry: [
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_1280.jpg',
      ],
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
      price: 100,
      location: 'Expo SP',
    };

    const result = await addEventsService.add(data);
    assert.strictEqual(result, mocks.returnSuccess);
  });

  it('Deve retornar erro se campos obrigatórios esteierem incompletos', async () => {
    const data: any = {
      description: 'Um evento massa sobre programação!',
      status: 'Ativo',
    };

    const promise = addEventsService.add(data);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 401);
      assert.deepEqual(error.message, 'Missing param title');
      return true;
    });
  });

  it('Deve retornar erro se data do evento for menor que data atual', async () => {
    const data = {
      title: 'Evento de programação',
      date: '24-04-2024',
      cover:
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
      galerry: [
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_1280.jpg',
      ],
      location: 'Expo SP',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
      price: 100,
    };

    const promise = addEventsService.add(data);
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
    const data = {
      title: 'Evento de programação',
      date: '2024-08-29',
      location: 'Expo SP',
      capacity: -1,
      cover:
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
      galerry: [
        'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_1280.jpg',
      ],
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
      price: 100,
    };

    const promise = addEventsService.add(data);
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
