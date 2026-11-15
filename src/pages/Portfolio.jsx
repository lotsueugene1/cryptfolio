import { Link } from 'react-router-dom'
import { usePortfolio } from '../contexts/PortfolioContext.jsx'
import { formatUSD } from '../utils/calculations.js'
import './Portfolio.css'

function Portfolio() {
  const { holdings, removeHolding } = usePortfolio()

  return (
    <div>
      <h1>Portfolio</h1>

      {holdings.length === 0 ? (
        <p className="portfolio-empty">No assets in your portfolio.</p>
      ) : (
        <div className="portfolio-table-container">
          <table className="portfolio-table">
            <thead>
              <tr>
                <th scope="col">Cryptocurrency</th>
                <th scope="col">Quantity</th>
                <th scope="col">Purchase price</th>
                <th scope="col">Invested</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr key={`${holding.coinId}-${index}`}>
                  <th scope="row">
                    <Link to={`/coins/${holding.coinId}`}>
                      {holding.name} ({holding.symbol})
                    </Link>
                  </th>
                  <td>{holding.quantity}</td>
                  <td>{formatUSD(holding.purchasePrice)}</td>
                  <td>{formatUSD(holding.quantity * holding.purchasePrice)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeHolding(index)}
                      aria-label={`Remove ${holding.name} from portfolio`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Portfolio
