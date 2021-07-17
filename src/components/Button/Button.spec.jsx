import { fireEvent ,render, screen } from "@testing-library/react";
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
        render(<Button text="Load more" />);
        expect.assertions(1);

        const button = screen.getByRole('button', {name: /load more/i}); 
        expect(button).toHaveAttribute('class', 'button');
    })
    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);

        const button = screen.getByRole('button', {name: /load more/i}); 
        fireEvent.click(button); //executa o evento de click no botao
        expect(fn).toHaveBeenCalledTimes(1)
    })
});

// screen utilizado para pegar o botao
// query nao levanta o erro se nao encontrar
// get utilizamos para quando sabemos que o elemento esta na tela
// visando acessibilidade, caso o elemento nao encontrado utilizamos o getbyrole