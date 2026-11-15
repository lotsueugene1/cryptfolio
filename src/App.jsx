import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Markets from './pages/Markets.jsx'
import Portfolio from './pages/Portfolio.jsx'
import CoinDetails from './pages/CoinDetails.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Layout
      title="CRYPTFOLIO"
      dashboardLabel="Dashboard"
      marketsLabel="Markets"
      portfolioLabel="Portfolio"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/coins/:coinId" element={<CoinDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
