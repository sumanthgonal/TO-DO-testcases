import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Item } from '../item';

const sampleTodo = { id: 1, title: 'Sample Todo', completed: false };

test('renders todo item correctly', () => {
  const dispatchMock = jest.fn();
  render(<Item todo={sampleTodo} dispatch={dispatchMock} index={0} />);

  // Check if the todo item is rendered with the correct title
  expect(screen.getByTestId('todo-item')).toBeInTheDocument();
  expect(screen.getByTestId('todo-item-label')).toHaveTextContent('Sample Todo');
  expect(screen.getByTestId('todo-item-toggle')).toBeInTheDocument();
  expect(screen.getByTestId('todo-item-button')).toBeInTheDocument();
});

test('toggles todo completion when checkbox is clicked', () => {
  const dispatchMock = jest.fn();
  render(<Item todo={sampleTodo} dispatch={dispatchMock} index={0} />);

  // Click the checkbox to toggle completion
  fireEvent.click(screen.getByTestId('todo-item-toggle'));

  // Check if dispatch is called with the correct action and payload
  expect(dispatchMock).toHaveBeenCalledWith({ type: 'TOGGLE_ITEM', payload: { id: 1 } });
});

test('deletes todo when "destroy" button is clicked', () => {
  const dispatchMock = jest.fn();
  render(<Item todo={sampleTodo} dispatch={dispatchMock} index={0} />);

  // Click the "destroy" button to remove the todo
  fireEvent.click(screen.getByTestId('todo-item-button'));

  // Check if dispatch is called with the correct action and payload
  expect(dispatchMock).toHaveBeenCalledWith({ type: 'REMOVE_ITEM', payload: { id: 1 } });
});

// test('enters edit mode when label is double-clicked', () => {
//     const dispatchMock = jest.fn();
//     render(<Item todo={sampleTodo} dispatch={dispatchMock} index={0} />);
  
//     // Double-click the label to enter edit mode
//     fireEvent.doubleClick(screen.getByTestId('todo-item-label'));
  
//     // Check if the input field is rendered in edit mode
//     expect(screen.getByTestId('edit-todo-input')).toBeInTheDocument();
// });
  
//   test('updates todo on edit and exits edit mode', () => {
//     const dispatchMock = jest.fn();
//     render(<Item todo={sampleTodo} dispatch={dispatchMock} index={0} />);
  
//     // Double-click the label to enter edit mode
//     fireEvent.doubleClick(screen.getByTestId('todo-item-label'));
  
//     // Update the todo by submitting the edited value
//     fireEvent.change(screen.getByTestId('edit-todo-input'), { target: { value: 'Edited Todo' } });
//     fireEvent.keyDown(screen.getByTestId('edit-todo-input'), { key: 'Enter', code: 'Enter' });
  
//     // Check if dispatch is called with the correct action and payload
//     expect(dispatchMock).toHaveBeenCalledWith({ type: 'UPDATE_ITEM', payload: { id: 1, title: 'Edited Todo' } });
  
//     // Check if the component exits edit mode
//     expect(screen.queryByTestId('edit-todo-input')).not.toBeInTheDocument();
// });
  