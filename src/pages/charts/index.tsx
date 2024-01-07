import { NextPage } from 'next'
import React from 'react'

import { AdminLayout } from '@layout'
import CandlestickChartPane from '@components/app/Charts'

const Charts: NextPage = () => (
  <AdminLayout>
    <CandlestickChartPane />
  </AdminLayout>
)

export default Charts
