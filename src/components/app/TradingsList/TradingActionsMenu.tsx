/* eslint-disable */
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { GraphQLApiClient } from '@lib/graphql-api-client'
import { TradingModel } from '@models/trading.model'

export function TradingActionsMenu(props: {
  tradingId: string;
  closedAt: string | null;
  callback: () => Promise<TradingModel[]>;
}) {
  const { tradingId, closedAt, callback } = props
  const openURL = `/trading?id=${tradingId}`

  const closeTradingHandler = async () => {
    const data = {
      id: tradingId,
      closedAt: new Date().toISOString().split('.').shift(),
    }

    await GraphQLApiClient.sendRequest('closeTrading', data, 'updateTrading')

    callback().then()
  }

  const restartTradingHandler = async () => {
    await GraphQLApiClient.sendRequest('restartTrading', { id: tradingId }, 'updateTrading')

    callback().then()
  }

  const deleteTradingHandler = async () => {
    const data = { id: tradingId }

    await GraphQLApiClient.sendRequest('deleteTrading', data)

    callback().then()
  }

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="button"
        bsPrefix="btn"
        className="btn-link rounded-0 text-black-50 shadow-none p-0"
        id={`action-${tradingId}`}
      >
        <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href={openURL}>Open</Dropdown.Item>
        {closedAt == null
          ? <Dropdown.Item onClick={closeTradingHandler}>Close</Dropdown.Item>
          : <Dropdown.Item onClick={restartTradingHandler}>Restart</Dropdown.Item>}
        <Dropdown.Item className="text-danger" onClick={deleteTradingHandler}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
