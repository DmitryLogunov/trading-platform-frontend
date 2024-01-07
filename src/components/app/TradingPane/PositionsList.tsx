/* eslint-disable */
import { Card, Table } from 'react-bootstrap'
import React from 'react'
import { PositionsModel } from '@models/positions.model'
import PositionRow from '@components/app/TradingPane/PositionRow'

type Props = {
  positionsList: PositionsModel[];
}

function handleDeletePosition(positionId: number) {
  alert(`Position delete clicked! ID: ${positionId}`)
}

export default function PositionsList(props: Props) {
  const { positionsList } = props

  return (
    <Card className="mb-4">
      <div className="justify-content-between">
        <div>
          <h4 className="p-2" style={{ paddingLeft: '1rem !important', marginBottom: '0rem' }}>Positions</h4>
        </div>
      </div>
      <Card.Body>
        <div style={{ height: '200px', overflow: 'hidden', overflowY: 'scroll' }}>
          <Table responsive bordered hover>
            <thead className="bg-light">
              <tr>
                <th>Opened</th>
                <th>Closed</th>
                <th>ROI (%)</th>
                <th>ROI (base currency)</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {positionsList.map((position) => (
                <tr key={position.id} className="background-red">
                  <PositionRow position={position} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  )
}
