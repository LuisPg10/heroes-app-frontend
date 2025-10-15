import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CustomPagination } from './CustomPagination';

vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: React.PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[]
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

describe('CustomPagination', () => {
  test('should render component with default values', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    expect(screen.getByText('Anteriores')).toBeDefined();
    expect(screen.getByText('Siguientes')).toBeDefined();
  });

  test('should disable previous button when page is 1', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    const previousButton = screen.getByText('Anteriores');

    expect(previousButton.getAttributeNames()).toContain('disabled');
  });

  test('should disable next button when we are in the last page', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);

    const nextButton = screen.getByText('Siguientes');

    expect(nextButton.getAttributeNames()).toContain('disabled');
  });

  test('should button 3 has the default variant when we are in the page 3', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);

    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');

    expect(button2.getAttribute('variant')).toBe('outline');
    expect(button3.getAttribute('variant')).toBe('default');
  });

  test('should change page when click on number button', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);

    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');

    expect(button2.getAttribute('variant')).toBe('outline');
    expect(button3.getAttribute('variant')).toBe('default');

    fireEvent.click(button2);

    expect(button2.getAttribute('variant')).toBe('default');
    expect(button3.getAttribute('variant')).toBe('outline');
  });
});
