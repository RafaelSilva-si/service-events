import assert from 'assert';
import UpdateEventService from '../../services/update-event.service';
import EventsRepository from '../../repositories/events.repository';
import Sinon from 'sinon';

describe('Update Event', () => {
  const eventRepository = new EventsRepository();
  const updateEvent = new UpdateEventService(eventRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve atualizar todas informações do evento verificando pelo ID.', async () => {
    const data = {
      title: 'Evento de programação',
      date: '24-06-2024',
      location: 'Expo SP',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
    };

    const result = await updateEvent.update('1', data);
    assert.deepEqual(result, { ...data, id: '1' });
  });

  it('Deve retornar um erro se o evento não existir com base no ID', async () => {
    Sinon.stub(EventsRepository.prototype, 'getEventByID').resolves(false);
    const data = {
      title: 'Evento de programação',
      date: '24-06-2024',
      location: 'Expo SP',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
    };

    const promise = updateEvent.update('1', data);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.status, 409);
      assert.deepEqual(error.message, 'Invalid param Evento Não Existe!');
      return true;
    });
  });

  it('Deve retornar erro se data do evento for menor que data atual.', async () => {
    const data = {
      title: 'Evento de programação',
      date: '24-04-2024',
      location: 'Expo SP',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
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
});
