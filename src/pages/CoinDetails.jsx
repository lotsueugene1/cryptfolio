import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCoinById } from '../services/coinlore.js'
import { formatUSD } from '../utils/calculations.js'
import './CoinDetails.css'

function formatChange(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

function changeClass(value) {
  return value >= 0 ? 'coin-change-positive' : 'coin-change-negative'
}

function CoinDetails() {
  const { coinId } = useParams()
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCoinById(coinId)
      .then((coinData) => setCoin(coinData))
      .catch(() => setError('Coin details could not be loaded.'))
      .finally(() => setLoading(false))
  }, [coinId])

  if (loading) {
    return <p role="status">Loading coin details...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  return (
    <div className="coin-details">
      <h1>{coin.name} ({coin.symbol})</h1>

      <dl className="coin-stats">
        <div className="coin-stat">
          <dt>Price</dt>
          <dd>{formatUSD(coin.price)}</dd>
        </div>
        <div className="coin-stat">
          <dt>Market cap</dt>
          <dd>{formatUSD(coin.marketCap)}</dd>
        </div>
        <div className="coin-stat">
          <dt>24-hour volume</dt>
          <dd>{formatUSD(coin.volume24)}</dd>
        </div>
        <div className="coin-stat">
          <dt>1-hour change</dt>
          <dd className={changeClass(coin.change1h)}>
            {formatChange(coin.change1h)}
          </dd>
        </div>
        <div className="coin-stat">
          <dt>24-hour change</dt>
          <dd className={changeClass(coin.change24h)}>
            {formatChange(coin.change24h)}
          </dd>
        </div>
        <div className="coin-stat">
          <dt>7-day change</dt>
          <dd className={changeClass(coin.change7d)}>
            {formatChange(coin.change7d)}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default CoinDetails
