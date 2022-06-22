import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import TEST_IDS from './helpers/dataTestIds';
import App from '../App';

describe('2 - Teste o componente header', () => {
  beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  test('Se o header contém os itens necessários.', () => {
    renderWithRouter(<App />, '/foods');

    const profileBtn = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');
    const searchBtn = screen.getByTestId(TEST_IDS.SEARCH_BTN_HEADER);
    expect(profileBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Se o botão profile leva para a página correta.', () => {
    const { history } = renderWithRouter(<App />, '/foods');

    fireEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/profile');
  });

  test('Se o botão search abre a gaveta.', () => {
    renderWithRouter(<App />, '/foods');

    fireEvent.click(screen.getByTestId(TEST_IDS.SEARCH_BTN_HEADER));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('Se o botão de pesquisa ativa somente ao digitar.', () => {
    renderWithRouter(<App />, '/foods');

    fireEvent.click(screen.getByTestId(TEST_IDS.SEARCH_BTN_HEADER));
    const searchInput = screen.getByTestId('search-input');
    const searchSubmitBtn = screen.getByTestId('exec-search-btn');
    expect(searchSubmitBtn.disabled).toBe(true);
    fireEvent.change(searchInput, { target: { value: 'xablau' } });
    expect(searchSubmitBtn.disabled).toBe(false);
  });
});
