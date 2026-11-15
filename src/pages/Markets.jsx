import { useEffect, useState } from 'react'
import { getCoins } from '../services/coinlore.js'
import { formatUSD } from '../utils/calculations.js'
import './Markets.css'

function Markets() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCoins()
      .then((coinData) => setCoins(coinData))
      .catch(() => setError('Prices could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Markets</h1>

      {loading && <p role="status">Loading prices...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <div className="market-table-container">
          <table className="market-table">
            <thead>
              <tr>
                <th scope="col">Cryptocurrency</th>
                <th scope="col">Symbol</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id}>
                  <th scope="row">{coin.name}</th>
                  <td>{coin.symbol}</td>
                  <td>{formatUSD(coin.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Markets
