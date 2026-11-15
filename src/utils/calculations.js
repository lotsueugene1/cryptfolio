export function formatUSD(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

export function createHolding(coin, quantity) {
  const amount = Number(quantity)

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Enter a quantity greater than zero.')
  }

  if (!Number.isFinite(coin.price) || coin.price <= 0 ||
      !Number.isFinite(amount * coin.price)) {
    throw new Error('This purchase amount is unavailable.')
  }

  return {
    coinId: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    quantity: amount,
    purchasePrice: coin.price,
  }
}

export function calculateTotals(holdings, coins) {
  let invested = 0
  let currentValue = 0
  let pricesAvailable = true

  for (const holding of holdings) {
    invested += holding.quantity * holding.purchasePrice
    const coin = coins.find((coin) => coin.id === holding.coinId)

    if (coin) {
      currentValue += holding.quantity * coin.price
    } else {
      pricesAvailable = false
    }
  }

  return {
    invested,
    currentValue: pricesAvailable ? currentValue : null,
    profitLoss: pricesAvailable ? currentValue - invested : null,
  }
}