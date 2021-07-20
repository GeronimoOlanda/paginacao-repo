import {render} from '@testing-library/react';

import {Posts} from '.';

// passando parametros para testes, sao chamados de mocks, parametros usados apenas para testes
const props = {
    posts: [
        {
            id: 1,
            title: 'title1',
            body: 'body1',
            cover: 'img/img.png'
        },
        {
            id: 2,
            title: 'title2',
            body: 'body2',
            cover: 'img/img.png'
        },
        {
            id: 3,
            title: 'title3',
            body: 'body3',
            cover: 'img/img.png'
        },
    ]
};

describe('<Posts />', () => {
    it('should render posts', () => {
       const {debug} = render(<Posts {...props} />)
        debug();
    });
});