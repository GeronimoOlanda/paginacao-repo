import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
describe('<Home />', () => {
  it('shoud render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Desculpe mermao, mas o que esta procurano nao esta aqui...');
    await waitForElementToBeRemoved(noMorePosts);

    screen.debug();
  });
});
