import { formatUSD } from '../utils/calculations.js'
import './CryptoCard.css'

function CryptoCard(props) {
  return (
    <article className="crypto-card">
      <div className="crypto-card-heading">
        <h3>{props.coin.name}</h3>
        <span>{props.coin.symbol}</span>
      </div>
      <p className="crypto-card-price">{formatUSD(props.coin.price)}</p>
      <button
        type="button"
        onClick={() => props.onSelect(props.coin)}
        aria-label={`Add ${props.coin.name} to portfolio`}
      >
        Add to portfolio
      </button>
    </article>
  )
}

export default CryptoCard
