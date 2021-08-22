import Alert from './Alert';
import { render, screen } from '@testing-library/react';

describe('Alert', () => {
    it('should render if there is an error', () => {
        const message = { body: "Some error", action: "Retry" }
        render(<Alert message={message} />);
        expect(screen.getByText("Some error")).toBeInTheDocument();
    })

    it('should render on form submission', () => {
        const message = { body: "Form submitted", action: "Next" }
        render(<Alert message={message} />);
        expect(screen.getByText("Form submitted")).toBeInTheDocument();
    })
})
