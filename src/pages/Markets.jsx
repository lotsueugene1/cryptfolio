import { Fragment, useEffect, useState } from 'react'
import AssetForm from '../components/AssetForm.jsx'
import { usePortfolio } from '../contexts/PortfolioContext.jsx'
import { getMarketCoins } from '../services/coinlore.js'
import { formatUSD } from '../utils/calculations.js'
import './Markets.css'

function Markets() {
  const { addHolding } = usePortfolio()
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMarketCoins()
      .then((coinData) => setCoins(coinData))
      .catch(() => setError('Prices could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  const searchText = search.toLowerCase()
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchText) ||
    coin.symbol.toLowerCase().includes(searchText)
  )

  function handleAdd(coin, quantity) {
    addHolding(coin, quantity)
    setSelectedCoin(null)
  }

  return (
    <div>
      <h1>Markets</h1>

      {loading && <p role="status">Loading prices...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <label className="market-search">
            Search markets
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <div className="market-table-container">
            <table className="market-table">
              <thead>
                <tr>
                  <th scope="col">Cryptocurrency</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin) => (
                  <Fragment key={coin.id}>
                    <tr>
                      <th scope="row">{coin.name}</th>
                      <td>{coin.symbol}</td>
                      <td>{formatUSD(coin.price)}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setSelectedCoin(coin)}
                          aria-label={`Add ${coin.name} to portfolio`}
                        >
                          Add
                        </button>
                      </td>
                    </tr>

                    {selectedCoin?.id === coin.id && (
                      <tr className="market-form-row">
                        <td colSpan="4">
                          <AssetForm
                            coin={selectedCoin}
                            onAdd={handleAdd}
                            onCancel={() => setSelectedCoin(null)}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Markets
