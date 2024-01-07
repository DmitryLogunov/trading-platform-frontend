import { NextPage } from 'next'
import React from 'react'

import { AdminLayout } from '@layout'
import { TradingsList } from '@components/app/TradingsList'

const Tradings: NextPage = () => (
  <AdminLayout>
    <TradingsList />
  </AdminLayout>
)

export default Tradings
