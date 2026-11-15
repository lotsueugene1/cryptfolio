import { useEffect, useState } from 'react'
import PortfolioSummary from '../components/PortfolioSummary.jsx'
import AssetForm from '../components/AssetForm.jsx'
import CryptoCard from '../components/CryptoCard.jsx'
import { getCoins } from '../services/coinlore.js'
import { calculateTotals, formatUSD } from '../utils/calculations.js'
import './Dashboard.css'

function Dashboard() {
  const [coins, setCoins] = useState([])
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [holdings, setHoldings] = useState(() => {
    const savedHoldings = localStorage.getItem('cryptfolio-holdings')
    return savedHoldings ? JSON.parse(savedHoldings) : []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCoins()
      .then((coinData) => setCoins(coinData))
      .catch(() => setError('Prices could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  function addAsset(coin, quantity) {
    const newHolding = {
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      quantity: Number(quantity),
      purchasePrice: coin.price,
    }

    const updatedHoldings = [...holdings, newHolding]

    setHoldings(updatedHoldings)
    localStorage.setItem('cryptfolio-holdings', JSON.stringify(updatedHoldings))
    setSelectedCoin(null)
  }

  const totals = calculateTotals(holdings, coins)

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
          {coins.map((coin) => (
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
          onAdd={addAsset}
          onCancel={() => setSelectedCoin(null)}
        />
      )}
    </div>
  )
}

export default Dashboard
