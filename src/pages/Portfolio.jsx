import { useState } from 'react'
import { formatUSD } from '../utils/calculations.js'
import './Portfolio.css'

function Portfolio() {
  const [holdings, setHoldings] = useState(() => {
    const savedHoldings = localStorage.getItem('cryptfolio-holdings')
    return savedHoldings ? JSON.parse(savedHoldings) : []
  })

  function removeHolding(index) {
    const updatedHoldings = holdings.filter((holding, holdingIndex) =>
      holdingIndex !== index
    )

    setHoldings(updatedHoldings)
    localStorage.setItem('cryptfolio-holdings', JSON.stringify(updatedHoldings))
  }

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
                    {holding.name} ({holding.symbol})
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
