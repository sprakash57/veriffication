import Loader from './Loader';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
    it('should render label', () => {
        render(<Loader />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    })
})
