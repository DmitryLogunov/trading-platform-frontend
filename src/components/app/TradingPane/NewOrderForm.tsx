import React, {useState} from "react";
import {Card} from "react-bootstrap";

import {Trading} from "@lib/graphql-api-client/types";
import {GraphQLApiClient} from "@lib/graphql-api-client";
import {formatISODatetime} from "@lib/helpers";
import {PositionsModel} from "@models/positions.model";
import {Position} from "@lib/graphql-api-client/types/positions.types";

export type NewOrderData = {
  datetime: string;
  baseCurrency?: string;
  secondaryCurrency?: string;
  action: string;
  amount: number;
  price: number;
}

type Props = {
  tradingData: Trading;
  orderData: NewOrderData;
  currentOpenedPositionId: string | null;
  setCurrentOpenedPositionId: (id: string | null) => void;
  refreshPositionsList: () => void;
  refreshOrderData: () => void;
  refreshTradingData: () => void;
}

export default function NewOrderForm(props: Props) {
  const {
    tradingData,
    orderData,
    currentOpenedPositionId,
    setCurrentOpenedPositionId,
    refreshPositionsList,
    refreshOrderData,
    refreshTradingData,
  } = props;

  const direction = orderData.action === 'buy' ?
    `${tradingData.baseCurrency} -> ${tradingData.secondaryCurrency}` :
    `${tradingData.secondaryCurrency} -> ${tradingData.baseCurrency}`;

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (parseFloat(event.target.price.value) === 0) {
      alert(`Price should not be equal 0`);
      return;
    }

    const gqlRequestName = event.target.action.value == `buy` ? `openPosition` : 'closePosition'
    const data = event.target.action.value == `buy` ?
      {
        tradingId: tradingData.id,
        baseCurrencyAmount: parseFloat(event.target.amount.value),
        price: parseFloat(event.target.price.value),
      } :
      {
        id: currentOpenedPositionId,
        price: parseFloat(event.target.price.value),
      }

    const openedPosition: Position|undefined = await GraphQLApiClient.sendRequest(gqlRequestName, data);

    if (openedPosition?.id && event.target.action.value == `buy`) {
      setCurrentOpenedPositionId(openedPosition.id);
    } else {
      setCurrentOpenedPositionId(null);
    }


    await refreshPositionsList();
    await refreshTradingData();
  }

  return (
    <>
      <div className="col-sm-3 align-items-stretch">
        <Card className="mb-4">
          <div className="justify-content-between">
            <div>
              <h4 className="p-2" style={{paddingLeft: "1rem !important", marginBottom: "0rem"}}>New order</h4>
              <button type="button" className="btn btn-link m-lg-2"
                      style={{position: "absolute", top: "-1rem", right: "-1rem"}}
                      data-toggle="tooltip" data-placement="top" title="Refresh new order form"
                      onClick={refreshOrderData}
              >
                <img src="/assets/img/arrow-clockwise.svg"/>
              </button>
            </div>
          </div>
          <Card.Body>
            <div style={{height: "230px", marginTop: "-20px"}}>
              <form onSubmit={handleSubmit}>
                <div className="form-group row py-1" style={{height: "39px"}}>
                  <label className="col-sm-4 col-form-label">Action</label>
                  <div className="col-sm-8" style={{marginLeft: "-40px"}}>
                    <input type="text" className="form-control bg-light" id="action" value={orderData.action}
                           readOnly={true}/>
                  </div>
                </div>
                <div className="form-group row py-1" style={{height: "39px"}}>
                  <label className="col-sm-4 col-form-label">Direction</label>
                  <div className="col-sm-8" style={{marginLeft: "-40px"}}>
                    <input type="text" className="form-control bg-light" id="direction" value={direction}
                           readOnly={true}/>
                  </div>
                </div>
                <div className="form-group row py-1" style={{height: "39px"}}>
                  <label className="col-sm-4 col-form-label">Datetime</label>
                  <div className="col-sm-8" style={{marginLeft: "-40px"}}>
                    <input type="text" className="form-control" id="datetime" defaultValue={formatISODatetime(orderData.datetime).replace('Z', '')}/>
                  </div>
                </div>
                <div className="form-group row py-1" style={{height: "39px"}}>
                  <label className="col-sm-4 col-form-label">Amount</label>
                  <div className="col-sm-8" style={{marginLeft: "-40px"}}>
                    <input type="text" className="form-control" id="amount" defaultValue={
                      orderData.action === "buy" ? tradingData.currentDepositInBaseCurrency : tradingData.currentDepositInSecondaryCurrency
                    } style={{width: "100px", float: "left"}}
                    />
                    <span style={{float: "left", width: "50px", margin: "10px", position: "relative", top: "-5px"}}>
                      { orderData.action === "buy" ? tradingData.baseCurrency : tradingData.secondaryCurrency }
                    </span>
                  </div>
                </div>
                <div className="form-group row py-1" style={{height: "39px"}}>
                  <label className="col-sm-4 col-form-label">Price</label>
                  <div className="col-sm-8" style={{marginLeft: "-40px"}}>
                    <input type="text" className="form-control" id="price" defaultValue={orderData.price}/>
                  </div>
                </div>
                <div className="form-row py-3 text-center" style={{marginTop: "-9px"}}>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}