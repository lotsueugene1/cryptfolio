import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import PortfolioProvider from '../../contexts/PortfolioContext.jsx'
import Portfolio from '../Portfolio.jsx'

describe('Portfolio', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows a saved holding and allows it to be removed', () => {
    localStorage.setItem(
      'cryptfolio-holdings',
      JSON.stringify([
        {
          coinId: '90',
          name: 'Bitcoin',
          symbol: 'BTC',
          quantity: 2,
          purchasePrice: 50000,
        },
      ]),
    )

    render(
      <MemoryRouter>
        <PortfolioProvider>
          <Portfolio />
        </PortfolioProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Bitcoin (BTC)' })).toHaveAttribute(
      'href',
      '/coins/90',
    )
    expect(screen.getByText('$100,000.00')).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Bitcoin from portfolio' }),
    )

    expect(screen.getByText('No assets in your portfolio.')).toBeInTheDocument()
  })
})
