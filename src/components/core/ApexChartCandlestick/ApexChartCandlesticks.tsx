/* eslint-disable */
import React from 'react'
import dynamic from 'next/dynamic'
import { CANDLESTICKS_CHART_DATA_2, CANDLESTICKS_CHART_OPTIONS } from '@components/core/ApexChartCandlestick/mock-data'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

class ApexChartCandlesticks extends React.Component<any, any> {
  constructor(props) {
    super(props)

    const series2 = [{
      data: CANDLESTICKS_CHART_DATA_2[0].data.map((item) => ({
        x: new Date(item.x),
        y: item.y,
      })),
    }]

    this.state = {
      options: CANDLESTICKS_CHART_OPTIONS,
      series: series2,
    }
  }

  render() {
    return (

      <div id="chart">
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={500} />
      </div>
    )
  }
}

export default ApexChartCandlesticks
