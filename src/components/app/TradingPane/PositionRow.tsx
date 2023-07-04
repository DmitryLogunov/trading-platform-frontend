import React from 'react'
import {PositionsModel} from "@models/positions.model";
import {formatISODatetime} from "@lib/helpers";

type Props = {
  position: PositionsModel;
}

function handleDeletePosition(positionId: number) {
    alert(`Position delete clicked! ID: ${positionId}`)
}

export default function PositionRow(props: Props) {
  const { position } = props
  const openingOrderInfo = `${formatISODatetime(position.openedAt)} / ${Number(position.openedPrice).toFixed(5)}`;
  const closingOrderInfo = position.closedAt && position.closedAt !== ''?
      `${formatISODatetime(position.closedAt)} / ${Number(position.closedPrice).toFixed(5)}` :
      '';
  const roiPercent = Number(position.roiInPercent).toFixed(3) || '';
  const roiUSDT = Number(position.roiInUSDT).toFixed(2) || '';

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
