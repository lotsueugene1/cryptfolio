import { useEffect, useState } from 'react'
import PortfolioSummary from '../components/PortfolioSummary.jsx'
import AssetForm from '../components/AssetForm.jsx'
import CryptoCard from '../components/CryptoCard.jsx'
import { usePortfolio } from '../contexts/PortfolioContext.jsx'
import { getMarketCoins } from '../services/coinlore.js'
import { calculateTotals, formatUSD } from '../utils/calculations.js'
import './Dashboard.css'

function Dashboard() {
  const { holdings, addHolding } = usePortfolio()
  const [coins, setCoins] = useState([])
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMarketCoins()
      .then((coinData) => setCoins(coinData))
      .catch(() => setError('Prices could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  function handleAdd(coin, quantity) {
    addHolding(coin, quantity)
    setSelectedCoin(null)
  }

  const totals = calculateTotals(holdings, coins)
  const featuredSymbols = ['BTC', 'ETH', 'SOL']
  const featuredCoins = coins.filter((coin) =>
    featuredSymbols.includes(coin.symbol)
  )

  return (
    <div>
      <h1>Dashboard</h1>
      <PortfolioSummary
        totalInvested={formatUSD(totals.invested)}
        currentValue={totals.currentValue === null ? 'Unavailable' : formatUSD(totals.currentValue)}
        profitLoss={totals.profitLoss === null ? 'Unavailable' : formatUSD(totals.profitLoss)}
      />

      <section className="dashboard-market" aria-labelledby="market-heading">
        <h2 id="market-heading">Cryptocurrencies</h2>
        {loading && <p role="status">Loading prices...</p>}
        {error && <p role="alert">{error}</p>}
        <div className="crypto-grid">
          {featuredCoins.map((coin) => (
            <CryptoCard
              key={coin.id}
              coin={coin}
              onSelect={setSelectedCoin}
            />
          ))}
        </div>
      </section>

      {selectedCoin && (
        <AssetForm
          key={selectedCoin.id}
          coin={selectedCoin}
          onAdd={handleAdd}
          onCancel={() => setSelectedCoin(null)}
        />
      )}
    </div>
  )
}

export default Dashboard
