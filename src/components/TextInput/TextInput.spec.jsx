import {render, screen} from '@testing-library/react';
import {TextInput} from '.';

// passando parametros para testes, sao chamados de mocks, parametros usados apenas para testes

describe('<TextInput />', () => {
    it('should have a value of searchValue', () => {
        const fn = jest.fn();
    });

    it('should call handleChange function on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'Testando'}/>);
    });
});