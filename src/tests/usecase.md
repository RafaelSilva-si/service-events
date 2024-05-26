# Eventos Usecase

## Adicionar: 

- Deve adicionar um Evento com os dados Titulo, Data, Local, Capacidade, Descrição, Categoria e status.
- Deve retornar erro se campos obrigatórios esteierem incompletos.
- Deve retornar erro se data do evento for menor que data atual.
- Deve retornar erro se capacidade for menor ou igual a 0.
- Deve retornar erro se categoria não for valida. (Jogos e Entreterimento, Comida, Negócio)
- Deve retornar erro se status não for valido. (Ativo, Cancelado, Finalizado).
- Deve salvar status ativo se não for passado nenhum parametro.

## Atualizar:

- Deve atualizar todas informações do evento verificando pelo ID.
- Deve retornar um erro se o evento não existir com base no ID.
- Deve retornar erro se data do evento for menor que data atual.
- Deve retornar erro se capacidade for menor ou igual a 0.

## Remover:

- Deve remover um evento com base em seu ID.
- Deve retornar um erro, caso o evento não exista.

## Listar:

- Deve Listar todos os eventos ativos registrados.

## Finalizar:

- Deve finalizar evento automaticamente se data atual for maior que data do evento.