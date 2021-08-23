import Button from './Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
    it('should render if there is an error', () => {
        render(<Button>Submit</Button>);
        expect(screen.getByText("Submit")).toBeInTheDocument();
    })
    it('should apply custom class', () => {
        const { container } = render(<Button className="AwesomeBtn">Submit</Button>);
        expect(container.querySelector("button")?.classList.contains("AwesomeBtn")).toBeTruthy()
    })
})
