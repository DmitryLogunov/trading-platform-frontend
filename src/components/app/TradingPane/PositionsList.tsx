import { Table } from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {PositionsModel} from "@models/positions.model";
import PositionRow from "@components/app/TradingPane/PositionRow";
import {Trading} from "@lib/graphql-api-client/types";
import {TradingModel} from "@models/trading.model";
import {GraphQLApiClient} from "@lib/graphql-api-client";
import {Position} from "@lib/graphql-api-client/types/positions.types";

type Props = {
  positions: PositionsModel[];
}

function handleDeletePosition(positionId: number) {
    alert(`Position delete clicked! ID: ${positionId}`)
}

export default function PositionsList(props: Props) {
  const { positionsList } = props


  return (
      <Table responsive bordered hover>
          <thead className="bg-light">
              <tr>
                <th>Opened</th>
                <th>Closed</th>
                <th>ROI (%)</th>
                <th>ROI (base currency)</th>
                <th></th>
              </tr>
          </thead>
          <tbody>
          {positionsList.map((position) => (
              <tr key={position.id}>
                    <PositionRow position={position}/>
              </tr>
          ))}
          </tbody>
      </Table>
  )
}
