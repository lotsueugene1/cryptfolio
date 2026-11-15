export function formatUSD(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

export function calculateTotals(holdings, coins) {
  let invested = 0
  let currentValue = 0
  let pricesAvailable = true

  for (const holding of holdings) {
    invested += holding.quantity * holding.purchasePrice
    const coin = coins.find((coin) =>
      coin.id === holding.coinId || coin.symbol === holding.symbol
    )

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
