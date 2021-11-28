import clsx from 'clsx'
import currency from 'currency.js'

export interface PriceProps {
  value: number
  isThrough?: boolean
  className?: string
}

// See https://currency.js.org/ for currency configuration
const defaultCurrencyConfig: currency.Options = {
  decimal: '.',
  separator: ',',
  symbol: '$',
  pattern: '! #',
}

export function Price(props: PriceProps) {
  const { value, isThrough, className } = props

  const formattedPrice = currency(value, defaultCurrencyConfig).format()

  return <span className={clsx(className, isThrough && 'line-through text-gray')}>{formattedPrice}</span>
}
