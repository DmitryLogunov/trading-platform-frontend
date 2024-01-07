import React from 'react'

import ChartTradingView from '@components/core/ChartTradingView/ChartTradingView'
import ApexChartCandlesticks from '@components/core/ApexChartCandlestick/ApexChartCandlesticks'

export default function CandlestickChartPane() {
  return (
    <div>
      <div className="row">
        <div className="col-sm-6 align-items-stretch" style={{ height: '500px', paddingBottom: '10px' }}>
          <ChartTradingView ticker="BTCUSDT" />
        </div>

        <div className="col-sm-6 align-items-stretch" style={{ height: '500px', paddingBottom: '10px' }}>
          <ApexChartCandlesticks />
        </div>
      </div>
    </div>
  )
}
