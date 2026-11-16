import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import CryptoCard from '../CryptoCard.jsx'

describe('CryptoCard', () => {
  it('shows coin information and links to its details page', () => {
    const coin = {
      id: '90',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 65000,
    }

    render(
      <MemoryRouter>
        <CryptoCard coin={coin} onSelect={() => {}} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Bitcoin' })).toHaveAttribute(
      'href',
      '/coins/90',
    )
    expect(screen.getByText('BTC')).toBeInTheDocument()
    expect(screen.getByText('$65,000.00')).toBeInTheDocument()
  })

  it('passes the coin to onSelect when Add to portfolio is clicked', () => {
    const coin = {
      id: '90',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 65000,
    }
    const onSelect = vi.fn()

    render(
      <MemoryRouter>
        <CryptoCard coin={coin} onSelect={onSelect} />
      </MemoryRouter>,
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Add Bitcoin to portfolio' }),
    )

    expect(onSelect).toHaveBeenCalledWith(coin)
  })
})
