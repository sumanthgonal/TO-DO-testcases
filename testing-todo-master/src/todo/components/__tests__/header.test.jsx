import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../header';

test('renders header with title and input', () => {
  const dispatchMock = jest.fn();

  render(<Header dispatch={dispatchMock} />);

  // Check if the title is rendered
  expect(screen.getByText('todos')).toBeInTheDocument();

  // Check if the input component is rendered
  expect(screen.getByTestId('text-input')).toBeInTheDocument();
});

test('calls dispatch with correct action on adding a new item', () => {
    const dispatchMock = jest.fn();
    render(<Header dispatch={dispatchMock} />);
    
    // Type a new todo in the input and press Enter
    const inputElement = screen.getByTestId('text-input');
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  
    // Check if dispatch is called with the correct action and payload
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'ADD_ITEM', payload: { title: 'New Todo' } });
  
    // Check if the input is cleared after submitting
    expect(inputElement).toHaveValue('');
  });

  test('renders input component with correct attributes', () => {
    render(<Header dispatch={() => {}} />);
    
    // Check if the input element is rendered with the correct attributes
    const inputElement = screen.getByTestId('text-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('placeholder', 'What needs to be done?');
    expect(inputElement).toHaveAttribute('id', 'todo-input');
  });
