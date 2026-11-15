export async function getCoins(signal) {
  const coinIds = ['btc-bitcoin', 'eth-ethereum', 'sol-solana']

  return Promise.all(coinIds.map(async (id) => {
    const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`, { signal })

    if (!response.ok) {
      throw new Error('Prices could not be loaded. Please try again.')
    }

    const data = await response.json()
    const price = data.quotes?.USD?.price

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error('A coin price is unavailable. Please try again.')
    }

    return { id: data.id, name: data.name, symbol: data.symbol, price }
  }))
}