import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AssetForm from '../AssetForm.jsx'

const coin = {
  id: '90',
  name: 'Bitcoin',
  symbol: 'BTC',
  price: 50000,
}

describe('AssetForm', () => {
  it('calculates the total and submits the quantity', () => {
    const onAdd = vi.fn()

    render(<AssetForm coin={coin} onAdd={onAdd} onCancel={() => {}} />)

    const quantityInput = screen.getByRole('spinbutton', {
      name: 'Quantity (BTC)',
    })
    const submitButton = screen.getByRole('button', {
      name: 'Add to portfolio',
    })

    expect(submitButton).toBeDisabled()

    fireEvent.change(quantityInput, { target: { value: '2' } })

    expect(screen.getByText('$100,000.00')).toBeInTheDocument()
    expect(submitButton).toBeEnabled()

    fireEvent.click(submitButton)

    expect(onAdd).toHaveBeenCalledWith(coin, '2')
  })

  it('calls onCancel when Cancel is clicked', () => {
    const onCancel = vi.fn()

    render(<AssetForm coin={coin} onAdd={() => {}} onCancel={onCancel} />)

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancel).toHaveBeenCalledOnce()
  })
})
