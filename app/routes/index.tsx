import dayjs from 'dayjs'
import * as React from 'react'
import { Column, useTable } from 'react-table'
import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, json } from 'remix'
import { MainLayout } from '~/layouts/main/main-layout'
import type { CoinMarket } from '~/module-types/coins-markets'
import { dateFormats } from '~/utils/constants'

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
    title: 'Crypto Market',
    description: 'Welcome to Crypto Market',
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let { coinsMarkets } = useLoaderData<IndexData>()

  const memoizedData = React.useMemo(() => coinsMarkets, [coinsMarkets.length])

  const tableColumns = React.useMemo(
    (): Column<CoinMarket>[] => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ cell: { value }, row: { original } }) => {
          return (
            <span className="flex gap-1 items-center">
              <img src={original.image} className="w-3" />
              <span className="float-right text-secondary font-bold">{value}</span>
            </span>
          )
        },
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Price',
        accessor: 'current_price',
        Cell: ({ cell: { value } }) => <span>$ {value}</span>,
      },
      {
        Header: 'Change',
        accessor: 'price_change_percentage_24h',
        Cell: ({ cell: { value } }) => {
          if (value > 0) {
            return <span className="text-success">{value} %</span>
          }

          return <span className="text-error">{value} %</span>
        },
      },
      {
        Header: 'Market Cap',
        accessor: 'market_cap',
        Cell: ({ cell: { value } }) => <span>${value}</span>,
      },
      {
        Header: 'Volume',
        accessor: 'total_volume',
      },
      {
        Header: 'Circulating Supply',
        accessor: 'circulating_supply',
        Cell: ({ cell: { value } }) => <span>${value}</span>,
      },
      {
        Header: 'Last Updated',
        accessor: 'last_updated',
        Cell: ({ cell: { value } }) => <span>{dayjs(value).format(dateFormats.COIN)}</span>,
      },
    ],
    [],
  )

  const tableInstance = useTable({ columns: tableColumns, data: memoizedData })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  return (
    <MainLayout>
      <div className="container my-3">
        <table {...getTableProps()} className="shadow w-full">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="p-1.5 border-b">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className="p-1.5">
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </MainLayout>
  )
}
