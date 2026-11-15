import { useState } from 'react'
import { formatUSD } from '../utils/calculations.js'
import './AssetForm.css'

function AssetForm(props) {
  const [quantity, setQuantity] = useState('')
  const total = Number(quantity) * props.coin.price
  const validQuantity = Number.isFinite(total) && total > 0

  function handleSubmit(event) {
    event.preventDefault()
    if (validQuantity) {
      props.onAdd(props.coin, quantity)
    }
  }

  return (
    <form className="asset-form" onSubmit={handleSubmit}>
      <h2>Add {props.coin.name}</h2>

      <div className="asset-form-fields">
        <div className="asset-form-detail">
          <span>Price per coin (USD)</span>
          <p>{formatUSD(props.coin.price)}</p>
        </div>

        <label>
          Quantity ({props.coin.symbol})
          <input
            type="number"
            name="quantity"
            autoFocus
            min="0"
            step="any"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </label>

        <div className="asset-form-detail">
          <span>Total cost (USD)</span>
          <output aria-live="polite">{formatUSD(validQuantity ? total : 0)}</output>
        </div>
      </div>

      <div className="asset-form-actions">
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button className="asset-form-submit" type="submit" disabled={!validQuantity}>
          Add to portfolio
        </button>
      </div>
    </form>
  )
}

export default AssetForm
