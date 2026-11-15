export async function getMarketCoins() {
  const response = await fetch('https://api.coinlore.net/api/tickers/?start=0&limit=100')

  if (!response.ok) {
    throw new Error('Prices could not be loaded.')
  }

  const result = await response.json()

  return result.data.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    price: Number(coin.price_usd),
  }))
}

export async function getCoinById(coinId) {
  const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${coinId}`)

  if (!response.ok) {
    throw new Error('Coin details could not be loaded.')
  }

  const result = await response.json()
  const coin = result[0]

  if (!coin) {
    throw new Error('Coin not found.')
  }

  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    price: Number(coin.price_usd),
    marketCap: Number(coin.market_cap_usd),
    volume24: Number(coin.volume24),
    change1h: Number(coin.percent_change_1h),
    change24h: Number(coin.percent_change_24h),
    change7d: Number(coin.percent_change_7d),
  }
}
