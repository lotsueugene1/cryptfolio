import './Header.css'

function Header(props) {
  return (
    <header className="header">
      <div className="header-content">
        <a className="header-title" href="/">
          {props.title}
        </a>

        <nav className="header-links" aria-label="Main navigation">
          <a href="/dashboard">{props.dashboardLabel}</a>
          <a href="/markets">{props.marketsLabel}</a>
          <a href="/portfolio">{props.portfolioLabel}</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
