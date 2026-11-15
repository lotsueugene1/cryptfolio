import { Link } from 'react-router-dom'
import './Header.css'

function Header(props) {
  return (
    <header className="header">
      <div className="header-content">
        <Link className="header-title" to="/dashboard">
          {props.title}
        </Link>

        <nav className="header-links" aria-label="Main navigation">
          <Link to="/dashboard">{props.dashboardLabel}</Link>
          <Link to="/markets">{props.marketsLabel}</Link>
          <Link to="/portfolio">{props.portfolioLabel}</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
