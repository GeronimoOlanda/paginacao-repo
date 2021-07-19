import { render } from '@testing-library/react';
import { PostCard }  from '.';

const mock = {
    title: 'title1',
    body: 'body1',
    id: 1,
    cover: 'img/img.png'
};

describe(<PostCard />, () => {
    it('should render PostCard correctly', () => {
        const {debug} =  render('<PostCard/>');
        debug();
    });
});