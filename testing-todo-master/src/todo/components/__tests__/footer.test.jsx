import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../footer';

test('renders footer with correct count and navigation links', () => {
  const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
  ];
  const dispatchMock = jest.fn();

  render(
    <MemoryRouter>
      <Footer todos={todos} dispatch={dispatchMock} />
    </MemoryRouter>
  );

  // Check if the footer is rendered
  expect(screen.getByTestId('footer')).toBeInTheDocument();

  // Check if the count is displayed correctly
  expect(screen.getByText('1 item left!')).toBeInTheDocument();

  // Check if navigation links are present
  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('Active')).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();
});

test('disables "Clear completed" button when no completed todos', () => {
  const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: false },
  ];
  const dispatchMock = jest.fn();

  render(
    <MemoryRouter>
      <Footer todos={todos} dispatch={dispatchMock} />
    </MemoryRouter>
  );

  // Check if the "Clear completed" button is disabled
  expect(screen.getByText('Clear completed')).toBeDisabled();
});

test('calls dispatch when "Clear completed" button is clicked', () => {
  const todos = [
    { id: 1, title: 'Todo 1', completed: true },
    { id: 2, title: 'Todo 2', completed: true },
  ];
  const dispatchMock = jest.fn();

  render(
    <MemoryRouter>
      <Footer todos={todos} dispatch={dispatchMock} />
    </MemoryRouter>
  );

  // Click the "Clear completed" button
  fireEvent.click(screen.getByText('Clear completed'));

  // Check if dispatch is called with the correct action
  expect(dispatchMock).toHaveBeenCalledWith({ type: 'REMOVE_COMPLETED_ITEMS' });
});

test('does not render footer when there are no todos', () => {
    const todos = [];
    const dispatchMock = jest.fn();
  
    render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={dispatchMock} />
      </MemoryRouter>
    );
  
    // Check if the footer is not rendered
    expect(screen.queryByTestId('footer')).toBeNull();
});

test('applies "selected" class to the correct navigation link', () => {
    const todos = [{ id: 1, title: 'Todo 1', completed: false }];
    const dispatchMock = jest.fn();
  
    render(
      <MemoryRouter initialEntries={['/completed']}>
        <Footer todos={todos} dispatch={dispatchMock} />
      </MemoryRouter>
    );
  
    // Check if the "Completed" link has the 'selected' class
    expect(screen.getByText('Completed')).toHaveClass('selected');
});


test('applies "selected" class to "All" navigation link by default', () => {
    const todos = [{ id: 1, title: 'Todo 1', completed: false }];
    const dispatchMock = jest.fn();
  
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer todos={todos} dispatch={dispatchMock} />
      </MemoryRouter>
    );
  
    // Check if the "All" link has the 'selected' class
    expect(screen.getByText('All')).toHaveClass('selected');
});
  
  
test('enables "Clear completed" button when there are completed todos', () => {
    const todos = [{ id: 1, title: 'Todo 1', completed: true }];
    const dispatchMock = jest.fn();
  
    render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={dispatchMock} />
      </MemoryRouter>
    );
  
    // Check if the "Clear completed" button is enabled
    expect(screen.getByText('Clear completed')).not.toBeDisabled();
});
  

