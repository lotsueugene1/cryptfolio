import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <Layout
      title="CRYPTFOLIO"
      dashboardLabel="Dashboard"
      marketsLabel="Markets"
      portfolioLabel="Portfolio"
    >
      <Dashboard />
    </Layout>
  )
}

export default App
