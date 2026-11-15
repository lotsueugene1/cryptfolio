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

export async function getCoins() {
  const coins = await getMarketCoins()
  const symbols = ['BTC', 'ETH', 'SOL']

  return coins.filter((coin) => symbols.includes(coin.symbol))
}
