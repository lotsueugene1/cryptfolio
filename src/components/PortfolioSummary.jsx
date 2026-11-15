import './PortfolioSummary.css'

function PortfolioSummary(props) {
  return (
    <section className="portfolio-summary" aria-label="Portfolio summary">
      <div className="summary-card">
        <h2>Total invested</h2>
        <p>{props.totalInvested}</p>
      </div>

      <div className="summary-card">
        <h2>Current value</h2>
        <p>{props.currentValue}</p>
      </div>

      <div className="summary-card">
        <h2>Profit / Loss</h2>
        <p>{props.profitLoss}</p>
      </div>
    </section>
  )
}

export default PortfolioSummary
