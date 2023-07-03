import { NextPage } from 'next'
import { AdminLayout } from '@layout'
// import { TradingModel } from '@models/trading.model'
// import { Resource } from '@models/resource'
import React from 'react'
import { TradingsList } from '@components/app/TradingsList'

// type Props = {
//   tradingResource: Resource<TradingModel>;
//   page: number;
//   perPage: number;
//   sort: string;
//   order: string;
// }

const Tradings: NextPage = () => {
  return (
      <AdminLayout>
        <TradingsList/>
      </AdminLayout>
  )
}

export default Tradings
