import { createContext, useContext, useEffect, useState } from 'react'

const PortfolioContext = createContext(null)

export function usePortfolio() {
  return useContext(PortfolioContext)
}

function PortfolioProvider(props) {
  const [holdings, setHoldings] = useState(() => {
    const savedHoldings = localStorage.getItem('cryptfolio-holdings')
    return savedHoldings ? JSON.parse(savedHoldings) : []
  })

  useEffect(() => {
    localStorage.setItem('cryptfolio-holdings', JSON.stringify(holdings))
  }, [holdings])

  function addHolding(coin, quantity) {
    const newHolding = {
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      quantity: Number(quantity),
      purchasePrice: coin.price,
    }

    setHoldings((currentHoldings) => [...currentHoldings, newHolding])
  }

  function removeHolding(index) {
    setHoldings((currentHoldings) =>
      currentHoldings.filter((holding, holdingIndex) => holdingIndex !== index)
    )
  }

  return (
    <PortfolioContext value={{ holdings, addHolding, removeHolding }}>
      {props.children}
    </PortfolioContext>
  )
}

export default PortfolioProvider
