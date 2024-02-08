import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Main } from '../main';
import { MemoryRouter } from 'react-router-dom';

const sampleTodos = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
  // Add more sample todos as needed
];

test('renders main component with correct structure', () => {
  render(
    <MemoryRouter>
      <Main todos={sampleTodos} dispatch={() => {}} />
    </MemoryRouter>
  );

  // Check if the main component is rendered with the correct structure
  expect(screen.getByTestId('main')).toBeInTheDocument();
  expect(screen.getByTestId('toggle-all')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
});

// test('toggles all todos when "Toggle All" checkbox is clicked', () => {
//   const dispatchMock = jest.fn();
//   render(
//     <MemoryRouter>
//     <Main todos={sampleTodos} dispatch={() => {}} />
//   </MemoryRouter>
//   );

//   // Click the "Toggle All" checkbox
//   fireEvent.click(screen.getByTestId('toggle-all'));

//   // Check if dispatch is called with the correct action and payload
//   expect(dispatchMock).toHaveBeenCalledWith({ "type": 'TOGGLE_ALL', payload: { completed: true } });
//   expect(dispatchMock).toHaveBeenCalledTimes(1);
// });

test('renders only active todos when route is "/active"', () => {
    render(
      <MemoryRouter initialEntries={['/active']}>
        <Main todos={sampleTodos} dispatch={() => {}} />
      </MemoryRouter>
    );
  
    // Check if only active todos are rendered
    const todoList = screen.getByTestId('todo-list');
    expect(todoList.children.length).toBe(1);
  
    // Ensure that the only rendered todo is the active one
    const activeTodoText = screen.getByText('Todo 1');
    expect(activeTodoText).toBeInTheDocument();
  
    // Ensure that no completed todos are rendered
    const completedTodoText = screen.queryByText('Todo 2');
    expect(completedTodoText).toBeNull();
  });
  

// Add more test cases for different routes ("/completed", "/") and other relevant scenarios.
