import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Header from '../Header.jsx'

describe('Header', () => {
  it('shows the title and navigation links', () => {
    render(
      <MemoryRouter>
        <Header
          title="CRYPTFOLIO"
          dashboardLabel="Dashboard"
          marketsLabel="Markets"
          portfolioLabel="Portfolio"
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'CRYPTFOLIO' })).toHaveAttribute(
      'href',
      '/dashboard',
    )

    const navigation = screen.getByRole('navigation', {
      name: 'Main navigation',
    })

    expect(within(navigation).getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'href',
      '/dashboard',
    )
    expect(within(navigation).getByRole('link', { name: 'Markets' })).toHaveAttribute(
      'href',
      '/markets',
    )
    expect(within(navigation).getByRole('link', { name: 'Portfolio' })).toHaveAttribute(
      'href',
      '/portfolio',
    )
  })
})
