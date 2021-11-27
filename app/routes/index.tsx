import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, json } from 'remix'
import type { CoinMarket } from '~/module-types/coins-markets'

type IndexData = {
  coinsMarkets: CoinMarket[]
}

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false',
  )

  const responseData = await response.json()

  let coinsMarkets: IndexData['coinsMarkets'] = responseData

  // https://remix.run/api/remix#json
  return json({
    coinsMarkets,
  })
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let { coinsMarkets } = useLoaderData<IndexData>()

  console.log(coinsMarkets)

  return (
    <div className="bg-primary">
      <h1>Hello World</h1>
    </div>
  )
}
