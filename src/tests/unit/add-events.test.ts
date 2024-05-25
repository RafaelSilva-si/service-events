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
});
