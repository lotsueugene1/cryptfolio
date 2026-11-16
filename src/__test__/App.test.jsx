
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock pages to test routing independently
vi.mock('../pages/Dashboard.jsx', () => ({
  default: () => <div>Dashboard Page</div>,
}));

vi.mock('../pages/Markets.jsx', () => ({
  default: () => <div>Markets Page</div>,
}));

vi.mock('../pages/Portfolio.jsx', () => ({
  default: () => <div>Portfolio Page</div>,
}));

vi.mock('../pages/CoinDetails.jsx', () => ({
  default: () => <div>Coin Details Page</div>,
}));

vi.mock('../pages/NotFound.jsx', () => ({
  default: () => <div>Not Found Page</div>,
}));

describe('CRYPTFOLIO App routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderApp = (route = '/') => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
  };

  it('renders the App layout', () => {
    renderApp('/dashboard');

    expect(screen.getByText('CRYPTFOLIO')).toBeTruthy();
  });

  it('redirects the home page to dashboard', () => {
    renderApp('/');

    expect(screen.getByText('Dashboard Page')).toBeTruthy();
  });

  it('renders the Dashboard page', () => {
    renderApp('/dashboard');

    expect(screen.getByText('Dashboard Page')).toBeTruthy();
  });

  it('renders the Markets page', () => {
    renderApp('/markets');

    expect(screen.getByText('Markets Page')).toBeTruthy();
  });

  it('renders the Portfolio page', () => {
    renderApp('/portfolio');

    expect(screen.getByText('Portfolio Page')).toBeTruthy();
  });

  it('renders Coin Details for a specific coin', () => {
    renderApp('/coins/90');

    expect(screen.getByText('Coin Details Page')).toBeTruthy();
  });

  it('renders NotFound for invalid routes', () => {
    renderApp('/invalid-page');

    expect(screen.getByText('Not Found Page')).toBeTruthy();
  });
});
