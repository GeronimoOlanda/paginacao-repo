import {render, screen} from '@testing-library/react';
import {TextInput} from '.';

// passando parametros para testes, sao chamados de mocks, parametros usados apenas para testes

describe('<Posts />', () => {
    it('should render posts', () => {
      render(<TextInput/>) 
    });

});