import { useParams } from 'react-router-dom'

function CoinDetails() {
  const { coinId } = useParams()

  return (
    <div>
      <h1>Coin details</h1>
      <p>Coin ID: {coinId}</p>
    </div>
  )
}

export default CoinDetails
