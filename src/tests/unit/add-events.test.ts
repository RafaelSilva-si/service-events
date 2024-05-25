import assert from 'assert';
import AddEventsService from '../../services/add-events.service';
import EventsRepository from '../../repositories/events.repository';

describe('Add Events', () => {
  const eventsRepository = new EventsRepository();
  const addEventsService = new AddEventsService(eventsRepository);

  it('Deve adicionar um Evento com os dados Titulo, Data, Local, Capacidade, Descrição, Categoria e status', async () => {
    const data = {
      title: 'Evento de programação',
      date: '24-06-2024',
      location: 'Expo SP',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
    };

    const result = await addEventsService.add(data);
    assert.deepEqual(result, { ...data, id: '1' });
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
      location: 'Expo SP',
      capacity: 100,
      description: 'Um evento massa sobre programação!',
      category: 'Tecnologia',
      status: 'Ativo',
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
});
