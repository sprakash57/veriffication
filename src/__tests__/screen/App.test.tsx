import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from '../../screens/App';

describe("App", () => {
  let container: any = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should show loading indicator', () => {
    act(() => {
      render(<App />, container);
    })
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
})
