import PortfolioSummary from '../components/PortfolioSummary.jsx'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <PortfolioSummary
        totalInvested="$0.00"
        currentValue="$0.00"
        profitLoss="$0.00"
      />
    </div>
  )
}

export default Dashboard
