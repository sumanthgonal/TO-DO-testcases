import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../input';

test('renders input with correct placeholder and label', () => {
  render(<Input onSubmit={() => {}} placeholder="Test Placeholder" label="Test Label" />);

  // Check if the input has the correct placeholder and label
  expect(screen.getByTestId('text-input')).toHaveAttribute('placeholder', 'Test Placeholder');
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
});

test('calls onSubmit with sanitized value when Enter key is pressed', () => {
  const onSubmitMock = jest.fn();

  render(<Input onSubmit={onSubmitMock} />);

  // Type a value in the input and press Enter
  fireEvent.change(screen.getByTestId('text-input'), { target: { value: 'Test&<Value>' } });
  fireEvent.keyDown(screen.getByTestId('text-input'), { key: 'Enter', code: 'Enter' });

  // Check if onSubmit is called with the sanitized value
  expect(onSubmitMock).toHaveBeenCalledWith('Test&amp;&lt;Value&gt;');
});

// test('renders input component with correct attributes', () => {
//     render(<Input onSubmit={() => {}} placeholder="Add a new todo" label="New Todo Input" defaultValue="" onBlur={() => {}} />);
  
//     // Check if the input element is rendered with the correct attributes
//     const inputElement = screen.getByTestId('text-input');
//     expect(inputElement).toBeInTheDocument();
//     expect(inputElement).toHaveAttribute('type', 'text');
//     expect(inputElement).toHaveAttribute('placeholder', 'Add a new todo');
//     expect(inputElement).toHaveAttribute('id', 'todo-input');
//     expect(inputElement).toHaveAttribute('autoFocus');
//     expect(inputElement).toHaveAttribute('autoFocus');
  
//     // Check if the label is rendered with the correct text content
//     expect(screen.getByLabelText('New Todo Input')).toBeInTheDocument();
//   });
  
  test('calls onSubmit callback on Enter key press with valid input', () => {
    const onSubmitMock = jest.fn();
    render(<Input onSubmit={onSubmitMock} placeholder="Add a new todo" label="New Todo Input" defaultValue="" onBlur={() => {}} />);
  
    // Simulate typing and pressing Enter
    const inputElement = screen.getByTestId('text-input');
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  
    // Check if the onSubmit callback is called with the sanitized input value
    expect(onSubmitMock).toHaveBeenCalledWith('New Todo');
  });
  
  test('does not call onSubmit callback on Enter key press with invalid input', () => {
    const onSubmitMock = jest.fn();
    render(<Input onSubmit={onSubmitMock} placeholder="Add a new todo" label="New Todo Input" defaultValue="" onBlur={() => {}} />);
  
    // Simulate pressing Enter without typing
    const inputElement = screen.getByTestId('text-input');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  
    // Check if the onSubmit callback is not called
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
  
  test('calls onBlur callback when input loses focus', () => {
    const onBlurMock = jest.fn();
    render(<Input onSubmit={() => {}} placeholder="Add a new todo" label="New Todo Input" defaultValue="" onBlur={onBlurMock} />);
  
    // Simulate input losing focus
    const inputElement = screen.getByTestId('text-input');
    fireEvent.blur(inputElement);
  
    // Check if the onBlur callback is called
    expect(onBlurMock).toHaveBeenCalled();
  });
