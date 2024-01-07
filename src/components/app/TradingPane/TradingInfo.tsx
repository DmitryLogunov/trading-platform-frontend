/* eslint-disable */
import { Container } from 'react-bootstrap'
import React from 'react'
import { Trading } from '@lib/graphql-api-client/types'
import { GraphQLApiClient } from '@lib/graphql-api-client'

type Props = {
  tradingData: Trading;
  refreshTradingData: () => Promise<Trading>;
}

export default function TradingInfo(props: Props) {
  const { tradingData, refreshTradingData } = props

  const closeTradingHandler = async () => {
    const data = {
      id: tradingData.id,
      closedAt: new Date().toISOString().split('.').shift(),
    }

    await GraphQLApiClient.sendRequest('closeTrading', data, 'updateTrading')

    refreshTradingData().then()
  }

  const restartTradingHandler = async () => {
    await GraphQLApiClient.sendRequest('restartTrading', { id: tradingData.id }, 'updateTrading')

    refreshTradingData().then()
  }

  const ticker = `${tradingData.secondaryCurrency}${tradingData.baseCurrency}`

  return (
    <div>
      <header className="header sticky-top mb-2 px-sm-2 border">
        <div className="row">
          <div className="col-sm-1 d-flex align-items-stretch">
            <h4 className="pt-3">{ticker}</h4>
          </div>
          <div className="col-sm-8 align-items-stretch" style={{ marginLeft: '-1.5rem' }}>
            <Container fluid className="d-flex align-items-center">
              <div className="justify-content-between m-lg-1">
                <div className="small text-black-50">
                  <span style={{ fontWeight: 'bold' }}>ID:</span>
                  {' '}
                  {tradingData.id}
                </div>
              </div>
              <span style={{
                display: 'block', width: '5px', marginRight: '5px', height: '12px', borderRight: '1px solid gray',
              }}
              />
              <div className="justify-content-between m-lg-1">
                <div className="small text-black-50">
                  <span style={{ fontWeight: 'bold' }}>Started:</span>
                  {' '}
                  {tradingData.startedAt}
                </div>
              </div>
              {tradingData.closedAt != null
                ? (
                  <div className="justify-content-between m-lg-1">
                    {tradingData.closedAt !== ''
                      ? (
                        <div className="small text-black-50">
                          <div style={{
                            paddingLeft: '5px', height: '12px', borderLeft: '1px solid gray', display: 'inline',
                          }}
                          >
                            <span style={{ fontWeight: 'bold' }}>Closed:</span>
                          </div>
                          {' '}
                          {tradingData.closedAt}
                        </div>
                      )
                      : ''}
                  </div>
                )
                : ''}
            </Container>
            <Container fluid className="d-flex align-items-center">
              <div className="justify-content-between m-lg-1">
                <div className="small text-black-50">
                  <span style={{ fontWeight: 'bold' }}>Started deposit: </span>
                  {Number(tradingData.baseDepositInBaseCurrency).toFixed(2)}
                  {' '}
                  {tradingData.baseCurrency}
                </div>
              </div>
              <span style={{
                display: 'block', width: '5px', marginRight: '5px', height: '12px', borderRight: '1px solid gray',
              }}
              />
              <div className="justify-content-between m-lg-1">
                <div className="small text-black-50">
                  <span style={{ fontWeight: 'bold' }}>
                    Current
                    {' '}
                    {tradingData.baseCurrency}
                    {' '}
                    balance:
                    {' '}
                  </span>
                  {Number(tradingData.currentDepositInBaseCurrency).toFixed(2) || 0}
                </div>
              </div>
              <span style={{
                display: 'block', width: '5px', marginRight: '5px', height: '12px', borderRight: '1px solid gray',
              }}
              />
              <div className="justify-content-between m-lg-1">
                <div className="small text-black-50">
                  <span style={{ fontWeight: 'bold' }}>
                    Current
                    {' '}
                    {tradingData.secondaryCurrency}
                    {' '}
                    balance:
                    {' '}
                  </span>
                  {Number(tradingData.currentDepositInSecondaryCurrency).toFixed(2) || 0}
                </div>
              </div>
              <span style={{
                display: 'block', width: '5px', marginRight: '5px', height: '12px', borderRight: '1px solid gray',
              }}
              />
              <div className="justify-content-between m-lg-1">
                <div className="small text-black-50">
                  <span style={{ fontWeight: 'bold' }}>ROI (%): </span>
                  {Number(tradingData.roiInPercent).toFixed(4) || 0}
                </div>
              </div>
              <span style={{
                display: 'block', width: '5px', marginRight: '5px', height: '12px', borderRight: '1px solid gray',
              }}
              />
              <div className="justify-content-between m-lg-1">
                <div className="small text-black-50">
                  <span style={{ fontWeight: 'bold' }}>ROI (USDT): </span>
                  {tradingData.roiInBaseCurrency ? `${Number(tradingData.roiInBaseCurrency).toFixed(2)} ${tradingData.baseCurrency}` : 0}
                </div>
              </div>
            </Container>
          </div>
          <div className="col-sm-3 align-items-stretch">
            <button
              type="button"
              className="btn btn-primary m-lg-2"
              style={{ position: 'absolute', top: '0.1rem', right: '4rem' }}
              data-toggle="tooltip"
              data-placement="top"
              title="Refresh trading info"
              onClick={refreshTradingData}
            >
              <img src="/assets/img/arrow-clockwise.svg" />
            </button>
            {tradingData.closedAt == null
              ? (
                <button
                  type="button"
                  className="btn btn-secondary m-lg-2"
                  style={{ position: 'absolute', top: '0.1rem', right: '1rem' }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Stop trading"
                  onClick={closeTradingHandler}
                >
                  <img src="/assets/img/stop-circle.svg" />
                </button>
              )
              : (
                <button
                  type="button"
                  className="btn btn-secondary m-lg-2"
                  style={{ position: 'absolute', top: '0.1rem', right: '1rem' }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Restart trading"
                  onClick={restartTradingHandler}
                >
                  <img src="/assets/img/play-circle.svg" />
                </button>
              )}
          </div>
        </div>
      </header>
    </div>
  )
}
