import { Table } from 'react-bootstrap'
import React from 'react'
import {PositionsModel} from "@models/positions.model";
import PositionRow from "@components/app/TradingPane/PositionRow";

type Props = {
  positions: PositionsModel[];
}

function handleDeletePosition(positionId: number) {
    alert(`Position delete clicked! ID: ${positionId}`)
}

export default function PositionsList(props: Props) {
  const { positions } = props

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
          {positions.map((position) => (
              <tr key={position.id}>
                    <PositionRow position={position}/>
              </tr>
          ))}
          </tbody>
      </Table>
  )
}
