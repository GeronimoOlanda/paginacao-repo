import {render} from '@testing-library/react';
import {Posts} from '.';

describe('<Posts />', () => {
    it('should render posts', () => {
        render(<Posts />)
    });
});