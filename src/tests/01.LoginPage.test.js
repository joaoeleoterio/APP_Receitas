import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import TEST_IDS from './helpers/dataTestIds';
import App from '../App';

const VALID_EMAIL = 'test@trybe.com';
const VALID_PASSWORD = '1234567';
const INVALID_INPUT = 'test';

describe('1 - Teste a página de login', () => {
  beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  test('Se a página contém os inputs necessários e o botão de login.', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(TEST_IDS.EMAIL_INPUT);
    const passwordInput = screen.getByTestId(TEST_IDS.PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(TEST_IDS.LOGIN_BTN);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('Se o botão "Entrar" permanesse desativado até preencher os inputs'
   + ' corretamente.', () => {
    renderWithRouter(<App />);

    const submitBtn = screen.getByTestId(TEST_IDS.LOGIN_BTN);
    expect(submitBtn.disabled).toBe(true);

    const emailInput = screen.getByTestId(TEST_IDS.EMAIL_INPUT);
    const passwordInput = screen.getByTestId(TEST_IDS.PASSWORD_INPUT);

    fireEvent.change(emailInput, { target: { value: INVALID_INPUT } });
    fireEvent.change(passwordInput, { target: { value: INVALID_INPUT } });
    expect(submitBtn.disabled).toBe(true);

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    expect(submitBtn.disabled).toBe(false);
  });

  test('Se ao entrar é redirecionado para página "/foods".', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(TEST_IDS.EMAIL_INPUT);
    const passwordInput = screen.getByTestId(TEST_IDS.PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(TEST_IDS.LOGIN_BTN);

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    fireEvent.click(submitBtn);

    expect(history.location.pathname).toBe('/foods');
  });

  test('Se ao entrar adiciona os itens ao localStorage.', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(TEST_IDS.EMAIL_INPUT);
    const passwordInput = screen.getByTestId(TEST_IDS.PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(TEST_IDS.LOGIN_BTN);

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    fireEvent.click(submitBtn);

    expect(localStorage.mealsToken).toBe('1');
    expect(localStorage.cocktailsToken).toBe('1');
    expect(localStorage.user).toBe(JSON.stringify({ email: VALID_EMAIL }));
  });
});
