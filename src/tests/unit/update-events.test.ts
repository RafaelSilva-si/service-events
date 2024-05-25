import assert from 'assert';
import UpdateEventService from '../../services/update-event.service';
import EventsRepository from '../../repositories/events.repository';

describe('Update Event', () => {
  const eventRepository = new EventsRepository();
  const updateEvent = new UpdateEventService(eventRepository);

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
});
