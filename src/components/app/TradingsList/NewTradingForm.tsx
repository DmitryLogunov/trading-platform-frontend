/* eslint-disable */
import React from 'react'
import { Container } from 'react-bootstrap'
import { formatISODatetime } from '@lib/helpers'
import { GraphQLApiClient } from '@lib/graphql-api-client'

type Props = {
  callback: () => void;
}

export default function NewTradingForm(props: Props) {
  const { callback } = props

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const data = {
      exchange: 'binance',
      baseCurrency: event.target.baseCurrency.value,
      secondaryCurrency: event.target.secondaryCurrency.value,
      startedAt: event.target.startedAt.value.replace(' ', 'T'),
      baseDepositInBaseCurrency: parseFloat(event.target.baseDepositInBaseCurrency.value.replace(' ', '')),
    }

    await GraphQLApiClient.sendRequest('createTrading', data)

    callback()
  }

  const currentISODatetime = formatISODatetime(new Date().toISOString())

  return (
    <div>
      <header className="header sticky-top mb-2 px-sm-2 border" style={{ minHeight: '60px' }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-10 align-items-stretch">
              <Container fluid className="d-flex align-items-center">
                <div className="justify-content-between m-lg-1" style={{ width: '300px' }}>
                  <div className="small text-black-50 d-flex">
                    <span style={{ fontWeight: 'bold', paddingTop: '1rem' }}>Base currency:</span>
                    <input
                      type="text"
                      className="form-control m-lg-2"
                      defaultValue="USDT"
                      id="baseCurrency"
                      style={{ width: '80px' }}
                    />
                  </div>
                </div>
                <div className="justify-content-between m-lg-1" style={{ width: '300px' }}>
                  <div className="small text-black-50 d-flex">
                    <span style={{ fontWeight: 'bold', paddingTop: '1rem' }}>Second currency:</span>
                    <input type="text" className="form-control m-lg-2" id="secondaryCurrency" style={{ width: '80px' }} />
                  </div>
                </div>
                <div className="justify-content-between m-lg-1" style={{ width: '500px' }}>
                  <div className="small text-black-50 d-flex">
                    <span style={{ fontWeight: 'bold', paddingTop: '1rem' }}>Start time:</span>
                    <input
                      type="text"
                      className="form-control m-lg-2"
                      defaultValue={currentISODatetime}
                      id="startedAt"
                      style={{ width: '180px' }}
                    />
                  </div>
                </div>
                <div className="justify-content-between m-lg-1" style={{ marginLeft: '-100px !important' }}>
                  <div className="small text-black-50 d-flex">
                    <span style={{ fontWeight: 'bold', paddingTop: '1rem' }}>Start deposit in base currency:</span>
                    <input
                      type="text"
                      className="form-control  w-25 m-lg-2"
                      defaultValue="10 000"
                      id="baseDepositInBaseCurrency"
                    />
                  </div>
                </div>
                <div className="justify-content-between m-lg-1" style={{ paddingRight: '100px' }} />
              </Container>
            </div>
            <div className="col-sm-2 align-items-stretch">
              <button
                type="submit"
                className="btn btn-primary m-lg-2"
                style={{ position: 'absolute', top: '0.1rem', right: '4rem' }}
                data-toggle="tooltip"
                data-placement="top"
                title="Create new trading"
              >
                Create new trading pane
              </button>
              <button
                type="button"
                className="btn btn-link m-lg-2"
                style={{ position: 'absolute', top: '-1rem', right: '-1rem' }}
                data-toggle="tooltip"
                data-placement="top"
                title="Hide new trading pane form"
                onClick={callback}
              >
                <img src="/assets/img/x.svg" />
              </button>
            </div>
          </div>
        </form>
      </header>
    </div>
  )
}
