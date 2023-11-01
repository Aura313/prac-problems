import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './Login';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: 'John' },
    }),
  },
}));
//Render Tests
test('username input should be rendered', () => {
  render(<Login />);
  const unIpEl = screen.getByPlaceholderText(/username/i);
  expect(unIpEl).toBeInTheDocument();
});

test('password input should be rendered', () => {
  render(<Login />);
  const passIpEl = screen.getByPlaceholderText(/password/i);
  expect(passIpEl).toBeInTheDocument();
});

test('login button should be rendered', () => {
  render(<Login />);
  const btnEl = screen.getByRole('button');
  expect(btnEl).toBeInTheDocument();
});

//default state tests
test('username input should be empty', () => {
  render(<Login />);
  const unIpEl = screen.getByPlaceholderText(/username/i);
  expect(unIpEl.value).toBe('');
});

test('password input should be empty', () => {
  render(<Login />);
  const passIpEl = screen.getByPlaceholderText(/password/i);
  expect(passIpEl.value).toBe('');
});

test('login button should be disabled if form is empty', () => {
  render(<Login />);
  const btnEl = screen.getByRole('button');
  expect(btnEl).toBeDisabled();
});

test('loading state should not be rendered', () => {
  render(<Login />);
  const btnEl = screen.getByRole('button');
  expect(btnEl).not.toHaveTextContent(/processing.../i);
});

test('error message should NOT be visible', () => {
  render(<Login />);
  const errEl = screen.getByTestId('error');
  expect(errEl).not.toBeVisible();
});

//action tests

test('username should change', () => {
  render(<Login />);
  const unIpEl = screen.getByPlaceholderText(/username/i);
  const unTestVal = 'test';
  fireEvent.change(unIpEl, { target: { value: unTestVal } });
  expect(unIpEl.value).toBe(unTestVal);
});

test('password input should change', () => {
  render(<Login />);
  const passIpEl = screen.getByPlaceholderText(/password/i);
  const passTestVal = 'test';
  fireEvent.change(passIpEl, { target: { value: passTestVal } });
  expect(passIpEl.value).toBe(passTestVal);
});

test('login button should NOT be disabled if form is NOT empty', () => {
  render(<Login />);
  const unIpEl = screen.getByPlaceholderText(/username/i);
  const passIpEl = screen.getByPlaceholderText(/password/i);
  const testVal = 'test';
  fireEvent.change(unIpEl, { target: { value: testVal } });
  fireEvent.change(passIpEl, { target: { value: testVal } });

  const btnEl = screen.getByRole('button');
  expect(btnEl).not.toBeDisabled();
});

test('loading state should be rendered',  () => {
  render(<Login />);
  const btnEl = screen.getByRole('button');
  const unIpEl = screen.getByPlaceholderText(/username/i);
  const passIpEl = screen.getByPlaceholderText(/password/i);

  const testVal = 'test';

  fireEvent.change(unIpEl, { target: { value: testVal } });
  fireEvent.change(passIpEl, { target: { value: testVal } });
  fireEvent.click(btnEl);

  //   expect(btnEl).toHaveTextContent(/processing..../i);
//   await waitFor(() => 
  expect(btnEl).toHaveTextContent(/Processing....$/i)
//   );
});

test('loading state should NOT be rendered after fecthing data', async () => {
  render(<Login />);
  const btnEl = screen.getByRole('button');
  const unIpEl = screen.getByPlaceholderText(/username/i);
  const passIpEl = screen.getByPlaceholderText(/password/i);
  const testVal = 'test';
  fireEvent.change(unIpEl, { target: { value: testVal } });
  fireEvent.change(passIpEl, { target: { value: testVal } });
  fireEvent.click(btnEl);
  await waitFor(() => expect(btnEl).not.toHaveTextContent(/Processing..../i));
});
