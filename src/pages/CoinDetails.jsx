import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCoinById } from '../services/coinlore.js'
import { formatUSD } from '../utils/calculations.js'

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
    <div>
      <h1>{coin.name} ({coin.symbol})</h1>

      <dl>
        <div>
          <dt>Price</dt>
          <dd>{formatUSD(coin.price)}</dd>
        </div>
        <div>
          <dt>Market cap</dt>
          <dd>{formatUSD(coin.marketCap)}</dd>
        </div>
        <div>
          <dt>24-hour volume</dt>
          <dd>{formatUSD(coin.volume24)}</dd>
        </div>
        <div>
          <dt>1-hour change</dt>
          <dd>{coin.change1h.toFixed(2)}%</dd>
        </div>
        <div>
          <dt>24-hour change</dt>
          <dd>{coin.change24h.toFixed(2)}%</dd>
        </div>
        <div>
          <dt>7-day change</dt>
          <dd>{coin.change7d.toFixed(2)}%</dd>
        </div>
      </dl>
    </div>
  )
}

export default CoinDetails
