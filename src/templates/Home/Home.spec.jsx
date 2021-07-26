import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';

// para cada url podemos interceptar e testar aqui mesmo
// primeiro parametro pega a url e testa, e o segundo é o resolver, o que faremos quando a url for chamada
const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    console.log('A chamada foi interceptada de posts');
    // setando alguns dados como resposta no momento que a URL é chamada
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body3',
        },
      ]),
    );
  }),

  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    console.log('A chamada foi interceptada de photo');
    // setando alguns dados como resposta no momento que a URL é chamada
    return res(
      ctx.json([
        {
          url: 'img/img1.png',
        },
        {
          url: 'img/img2.png',
        },
        {
          url: 'img/img3.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);
describe('<Home />', () => {
  beforeAll(() => {
    server.listen(); // vai ficar escutando as chamadas antes de executar todo os testes ele liga
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close(); // depois que acabar os testes, desliga o servidor
  });

  it('shoud render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Desculpe mermao, mas o que esta procurano nao esta aqui...');
    await waitForElementToBeRemoved(noMorePosts);
    expect.assertions(3);
    const search = screen.getByPlaceholderText(/Digite a sua pesquisa/i);
    expect(search).toBeInTheDocument();

    const image = screen.getAllByRole('img', { name: /title/i });
    expect(image).toHaveLength(3);

    const button = screen.getByRole('button', { name: /load more Posts/i });
    expect(button).toBeInTheDocument();
  });
  // testando buscas por posts
  it('shoud search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Desculpe mermao, mas o que esta procurano nao esta aqui...');
    await waitForElementToBeRemoved(noMorePosts);
    //expect.assertions(3);
    const search = screen.getByPlaceholderText(/Digite a sua pesquisa/i);
    expect(screen.getByRole('heading', { name: 'title 1 1' }));
    expect(screen.getByRole('heading', { name: 'title 2 2' }));
  });
});
