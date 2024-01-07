/* eslint-disable */
import React, { useEffect, useRef } from 'react'

type Props = {
  ticker: string;
}

let tvScriptLoadingPromise: Promise<unknown>

export default function ChartTradingView(props: Props) {
  const { ticker } = props

  const onLoadScriptRef = useRef()

  // @ts-ignore
  useEffect(
    () => {
      // @ts-ignore
      onLoadScriptRef.current = createWidget

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script')
          script.id = 'tradingview-widget-loading-script'
          script.src = 'https://s3.tradingview.com/tv.js'
          script.type = 'text/javascript'
          script.onload = resolve

          document.head.appendChild(script)
        })
      }

      // @ts-ignore
      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current())

      // @ts-ignore
      // return () => onLoadScriptRef.current = null

      function createWidget() {
        if (document.getElementById('tradingview_1234') && 'TradingView' in window) {
          // @ts-ignore
          new window.TradingView.widget({
            width: '810px',
            height: '520px',
            symbol: 'BINANCE:BTCUSDT',
            interval: '1',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_1234',
          })
        }
      }
    },
    [],
  )

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_1234" />
      <div className="tradingview-widget-copyright" />
    </div>
  )
}
