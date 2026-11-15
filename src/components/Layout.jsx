import Header from './Header.jsx'
import './Layout.css'

function Layout(props) {
  return (
    <div>
      <Header
        title={props.title}
        dashboardLabel={props.dashboardLabel}
        marketsLabel={props.marketsLabel}
        portfolioLabel={props.portfolioLabel}
      />

      <main className="page-content">{props.children}</main>
    </div>
  )
}

export default Layout
