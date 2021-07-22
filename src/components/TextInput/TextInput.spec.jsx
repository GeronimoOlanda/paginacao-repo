import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

// passando parametros para testes, sao chamados de mocks, parametros usados apenas para testes

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'Funfano'} />);

    const input = screen.getByPlaceholderText(/Digite a sua pesquisa/i);
    expect(input).toBeInTheDocument(); // verifica se o que queremos esta no documento
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn(); // cria uma funcao imaginaria para testes
    render(<TextInput handleChange={fn} searchValue="um valor qualquer" />);

    const input = screen.getByPlaceholderText(/Digite a sua pesquisa/i); //verifica se o que o usuario esta vendo é o que queremos

    const value = 'o valor';

    //userEvent.type recebe dois parametros, o primeiro é a entrada,
    //e depois o valor que ela vai receber para teste
    userEvent.type(input, value);

    expect(input.value).toBe('um valor qualquer');
    expect(fn).toHaveBeenCalledTimes(value.length); // verifica quantas vezes a variavel foi chamada
  });

  it('should math snapshot', () => {
    const fn = jest.fn(); // cria uma funcao imaginaria para testes
    const { container } = render(<TextInput handleChange={fn} searchValue="" />);

    expect(container).toMatchSnapshot();
  });
});
