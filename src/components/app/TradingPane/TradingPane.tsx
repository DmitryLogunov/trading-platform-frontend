/* eslint-disable */
import {
  BarElement, CategoryScale, Chart, Filler, LinearScale, LineElement, PointElement, Tooltip,
} from 'chart.js'
import React, { useEffect, useState } from 'react'

import AlertsList from '@components/app/TradingPane/AlertsList'
import TradingInfo from '@components/app/TradingPane/TradingInfo'
import PositionsList from '@components/app/TradingPane/PositionsList'
import NewOrderForm, { NewOrderData } from '@components/app/TradingPane/NewOrderForm'
import { formatISODatetime } from '@lib/helpers'
import { Trading } from '@lib/graphql-api-client/types'
import { GraphQLApiClient } from '@lib/graphql-api-client'
import { Position } from '@lib/graphql-api-client/types/positions.types'
import { PositionsModel } from '@models/positions.model'
import ChartTradingView from '@components/core/ChartTradingView/ChartTradingView'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

type Props = {
  tradingId: string;
}

export default function TradingPane(props: Props) {
  const { tradingId } = props

  const [orderData, setOrderData] = useState({} as NewOrderData)
  const [tradingData, setTradingData] = useState({} as Trading)
  const [currentOpenedPositionId, setCurrentOpenedPositionId] = useState(null as string | null)
  const [positionsList, setPositionsList] = useState([])
  const [ticker, setTicker] = useState('BTCUSDT')

  let isTradingDataLoaded = false
  let isPositionsLoaded = false

  const refreshTradingData = async (): Promise<Trading> => GraphQLApiClient.refreshData<Trading, Trading>(
    'refreshTrading',
    setTradingData,
    (data: Trading) => !!data.id,
    undefined,
    { id: tradingId },
  )

  const refreshOrderData = () => {
    const amount = currentOpenedPositionId === null
      ? Number(tradingData.currentDepositInBaseCurrency).toFixed(2)
      : Number(tradingData.currentDepositInSecondaryCurrency).toFixed(2)

    const price = currentOpenedPositionId === null
      ? (Array.isArray(positionsList) && positionsList.length > 0 && (positionsList[0] as PositionsModel).closedPrice) || 0
      : (Array.isArray(positionsList) && positionsList.length > 0 && (positionsList[0] as PositionsModel).openedPrice) || 0

    const refreshedOrderData: NewOrderData = {
      datetime: formatISODatetime(new Date().toISOString()),
      action: currentOpenedPositionId === null ? 'buy' : 'sell',
      amount: parseFloat(amount),
      price: parseFloat(Number(price).toFixed(5)),
    }

    setOrderData(refreshedOrderData)
  }

  const refreshPositionsList = async () => {
    const parsingPositionsHandler = (data: Position[]) => data.map((p) => ({
      id: String(p.id),
      ticker: `${p.secondaryCurrency}${p.baseCurrency}`,
      openedAt: p.createdAt,
      openedPrice: p.orders[0].price,
      closedAt: p.closedAt || '',
      closedPrice: p.orders[1]?.price || '',
      roiInPercent: p.roiInPercent !== 0 ? p.roiInPercent : '',
      roiInUSDT: p.roiInBaseCurrency !== 0 ? p.roiInBaseCurrency : '',
    })) as PositionsModel[]

    return GraphQLApiClient.refreshData<Position[], PositionsModel[]>(
      'getPositions',
      setPositionsList as (data: PositionsModel[]) => void,
      (data: Position[]) => Array.isArray(data) && data.length > 0,
      parsingPositionsHandler,
      { tradingId },
    )

    await refreshOrderData()
  }

  useEffect(() => {
    if (isTradingDataLoaded) return
    isTradingDataLoaded = true;

    (async () => {
      const data = await refreshTradingData()

      if (data) {
        setTicker(`${data.secondaryCurrency}${data.baseCurrency}`)
      }
    })()
  }, [positionsList])

  useEffect(() => {
    if (isPositionsLoaded) return
    isPositionsLoaded = true;

    (async () => {
      const positions = await refreshPositionsList()

      const lastOpenedPositionId = (Array.isArray(positions)
          && positions.length > 0
          && positions[0].closedAt === ''
          && positions[0]?.id)
        || null

      setCurrentOpenedPositionId(lastOpenedPositionId)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      await refreshOrderData()
    })()
  }, [currentOpenedPositionId, tradingId])

  return (
    <div>
      <TradingInfo tradingData={tradingData} refreshTradingData={refreshTradingData} />

      <div className="row">
        <div className="col-sm-6 align-items-stretch" style={{ height: '500px', paddingBottom: '10px' }}>
          <ChartTradingView ticker={ticker} />
        </div>

        <div className="col-sm-6 align-items-stretch" style={{ height: '500px', paddingBottom: '10px' }}>
          <AlertsList tradingData={tradingData} setOrderData={setOrderData} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-9 align-items-stretch">
          <PositionsList positionsList={positionsList} />
        </div>

        <NewOrderForm
          tradingData={tradingData}
          orderData={orderData}
          currentOpenedPositionId={currentOpenedPositionId}
          setCurrentOpenedPositionId={setCurrentOpenedPositionId}
          refreshTradingData={refreshTradingData}
          refreshOrderData={refreshOrderData}
          refreshPositionsList={refreshPositionsList}
        />
      </div>
    </div>

  )
}
