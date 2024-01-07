import { NextPage } from 'next'
import React from 'react'

import { AdminLayout } from '@layout'
import { SignalsList } from '@components/app/Signals'
import { Trading } from '@lib/graphql-api-client/types'

const Tradings: NextPage = () => (
  <AdminLayout>
    <SignalsList
      tradingData={{} as Trading}
      setOrderData={() => {
      }}
    />
  </AdminLayout>
)

export default Tradings
