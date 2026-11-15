import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Markets from './pages/Markets.jsx'
import Portfolio from './pages/Portfolio.jsx'

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
      </Routes>
    </Layout>
  )
}

export default App
