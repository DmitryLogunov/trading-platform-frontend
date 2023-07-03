import React from 'react'
import {PositionsModel} from "@models/positions.model";

type Props = {
  position: PositionsModel;
}

function handleDeletePosition(positionId: number) {
    alert(`Position delete clicked! ID: ${positionId}`)
}

export default function PositionRow(props: Props) {
  const { position } = props
  const openingOrderInfo = `${position.openedAt} : ${position.openedPrice}`;
  const closingOrderInfo = position.closedAt && position.closedAt !== ''?
      `${position.closedAt} : ${position.openedPrice}` :
      '';
  const roiPercent = position.roiInPercent || '';
  const roiUSDT = position.roiInUSDT || '';

  return (
    <>
        <td>{openingOrderInfo}</td>
        <td>{closingOrderInfo}</td>
        <td>{roiPercent}</td>
        <td>{roiUSDT}</td>
        <td style={{width: "50px"}}>
            <button type="button" className="btn btn-link"
                    data-toggle="tooltip" data-placement="top" title="Delete position"
                    onClick={() => handleDeletePosition(position.id)}
            >
                <img src="/assets/img/x-circle.svg"/>
            </button>
        </td>
    </>
  )
}
