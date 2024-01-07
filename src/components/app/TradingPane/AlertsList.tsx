/* eslint-disable */
import { Card, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { AlertsModel } from '@models/alerts.model'
import { NewOrderData } from '@components/app/TradingPane/NewOrderForm'
import { Trading } from '@lib/graphql-api-client/types'
import { GraphQLApiClient } from '@lib/graphql-api-client'
import { Alert } from '@lib/graphql-api-client/types/alerts.types'
import { formatISODatetime } from '@lib/helpers'

type Props = {
  tradingData: Trading;
  setOrderData: (orderData: NewOrderData) => void;
}

let lastAlertsRefreshedTimestamp: number | null = null

export default function AlertsList(props: Props) {
  const { tradingData, setOrderData } = props
  const [alertsList, setAlertsList] = useState([] as AlertsModel[])

  const ticker = `${tradingData.secondaryCurrency}${tradingData.baseCurrency}`
  const createdAtFrom = tradingData.startedAt

  const handleFillOrder = (params: {
    alert: AlertsModel;
    baseCurrency: string;
    secondaryCurrency: string;
    baseCurrencyAmount: number;
    secondaryCurrencyAmount: number;
  }) => {
    const {
      alert: { datetime, action, price },
      baseCurrency,
      secondaryCurrency,
      baseCurrencyAmount,
      secondaryCurrencyAmount,
    } = params

    const amount = action === 'buy'
      ? Number(baseCurrencyAmount).toFixed(2)
      : Number(secondaryCurrencyAmount).toFixed(2)

    setOrderData({
      datetime,
      baseCurrency,
      secondaryCurrency,
      action,
      amount: parseFloat(amount) || 0,
      price,
    })
  }

  const refreshAlertsList = async (
    ticker: string,
    createdAtFrom: string,
  ): Promise<AlertsModel[] | undefined> => {
    const currentUnixTimestamp = Date.now()
    if (lastAlertsRefreshedTimestamp !== null
      && currentUnixTimestamp - lastAlertsRefreshedTimestamp < 2000
    ) return

    lastAlertsRefreshedTimestamp = Date.now()

    if (!ticker || !createdAtFrom) return

    const parsingAlertsHandler = (data: Alert[]): AlertsModel[] => {
      const timestamp = formatISODatetime(new Date().toISOString())
      console.log(`[${timestamp}] Alerts refreshing ...`)

      return data.map(
        (t) => ({
          id: t.id,
          title: t.title,
          ticker: t.ticker,
          action: t.action,
          price: t.price,
          datetime: t.createdAt,
        }),
      ) as AlertsModel[]
    }

    const data = await GraphQLApiClient.refreshData(
      'getAlerts',
      setAlertsList,
      (data: Alert[]) => Array.isArray(data) && data.length > 0,
      parsingAlertsHandler,
      { ticker, createdAtFrom },
    )

    return data
  }

  useEffect(() => {
    (async () => {
      await refreshAlertsList(ticker, createdAtFrom)
    })()
  }, [tradingData])

  setInterval(async () => {
    await refreshAlertsList(ticker, createdAtFrom)
  }, 0)

  setTimeout(async () => {
    await refreshAlertsList(ticker, createdAtFrom)
  }, 3000)

  return (
    <Card className="mb-4" style={{ height: '100%' }}>
      <div className="justify-content-between">
        <div>
          <h4 className="pt-2" style={{ paddingLeft: '1rem !important', marginBottom: '0rem' }}>Alerts</h4>
        </div>
      </div>
      <Card.Body>
        <div style={{ height: '400px', overflow: 'hidden', overflowY: 'scroll' }}>
          <Table responsive bordered hover>
            <tbody>
              {alertsList.map((alert) => {
                const currentDateTimestamp = new Date().getTime()
                const alertDateTimestamp = new Date(alert.datetime).getTime()
                const isNew = currentDateTimestamp - alertDateTimestamp < 300000

                const newBackgroundColorCssOptions = isNew ? { backgroundColor: '#08cb08' } : {}

                return (
                  <tr key={alert.id}>
                    <td
                      style={{ ...newBackgroundColorCssOptions }}
                    >
                      {formatISODatetime(alert.datetime).replace('Z', '')}
                    </td>
                    <td style={{ ...newBackgroundColorCssOptions }}>{alert.title}</td>
                    <td style={{ ...newBackgroundColorCssOptions }}>{alert.ticker}</td>
                    <td style={{ ...newBackgroundColorCssOptions }}>{Number(alert.price).toFixed(5)}</td>
                    <td
                      style={{ ...newBackgroundColorCssOptions }}
                    >
                      {parseInt(alert.action) === 0 || alert.action === 'buy' ? 'buy' : 'sell'}
                    </td>
                    <td style={{ ...newBackgroundColorCssOptions }}>
                      <button
                        type="button"
                        className="btn btn-link"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete position"
                        onClick={() => handleFillOrder({
                          alert,
                          baseCurrency: tradingData.baseCurrency,
                          secondaryCurrency: tradingData.secondaryCurrency,
                          baseCurrencyAmount: tradingData.currentDepositInBaseCurrency || 0,
                          secondaryCurrencyAmount: tradingData.currentDepositInSecondaryCurrency || 0,
                        })}
                      >
                        <img src="/assets/img/coin.svg" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  )
}
