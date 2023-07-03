import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import React from 'react'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const Home: NextPage = () => (
  <AdminLayout>
    {/*<TradingsList>*/}
    {/*</TradingsList>*/}
  </AdminLayout>
)

export default Home
