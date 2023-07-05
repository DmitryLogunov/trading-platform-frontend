import {Card, Table} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {AlertsModel} from "@models/alerts.model";
import {NewOrderData} from "@components/app/TradingPane/NewOrderForm";
import {Trading} from "@lib/graphql-api-client/types";
import {GraphQLApiClient} from "@lib/graphql-api-client";
import {Alert} from "@lib/graphql-api-client/types/alerts.types";
import {formatISODatetime} from "@lib/helpers";

type Props = {
  tradingData: Trading;
  setOrderData: (orderData: NewOrderData) => void;
}

export default function AlertsList(props: Props) {
  const { tradingData, setOrderData } = props
  const [ alertsList, setAlertsList] = useState([] as AlertsModel[]);
  let isDataLoaded = false;

  const handleFillOrder = (params: {
    alert: AlertsModel,
    baseCurrency: string,
    secondaryCurrency: string,
    baseCurrencyAmount: number,
    secondaryCurrencyAmount: number,
  }) => {
      const {
        alert: { datetime, action, price},
        baseCurrency,
        secondaryCurrency,
        baseCurrencyAmount,
        secondaryCurrencyAmount,
      } = params;

      const amount = action === 'buy' ?
        Number(baseCurrencyAmount).toFixed(2) :
        Number(secondaryCurrencyAmount).toFixed(2);

      setOrderData({
          datetime,
          baseCurrency,
          secondaryCurrency,
          action,
          amount: parseFloat(amount) || 0,
          price,
      })
    }

  const refreshAlertsList = async (ticker: string, createdAtFrom: string): Promise<AlertsModel[]> => {
    const parsingAlertsHandler = (data: Alert[]): AlertsModel[] => {
      return data.map(
        t => ({
          id: t.id,
          title: t.title,
          ticker: t.ticker,
          action: t.action,
          price: t.price,
          datetime: t.createdAt,
        })
      ) as AlertsModel[];
    };

    return GraphQLApiClient.refreshData(
      'getAlerts',
      setAlertsList,
      (data: Alert[]) => Array.isArray(data) && data.length > 0,
      parsingAlertsHandler,
      {ticker, createdAtFrom}
    );
  }

  useEffect(() => {
    const ticker = `${tradingData.secondaryCurrency}${tradingData.baseCurrency}`;
    const createdAtFrom = tradingData.startedAt;

    if (!ticker || !createdAtFrom) return;

    if (isDataLoaded) return;
    isDataLoaded = true;

    (async () => { await refreshAlertsList(ticker, createdAtFrom); })();
  }, [tradingData]);

  return (
    <>
      <Card className="mb-4" style={{height: "100%"}}>
        <div className="justify-content-between">
          <div>
            <h4  className="pt-2" style={{paddingLeft: "1rem !important", marginBottom: "0rem"}}>Alerts</h4>
          </div>
        </div>
        <Card.Body>
          <div style={{height: "400px", overflow: "hidden", overflowY: "scroll"}}>
            <Table responsive bordered hover>
              <tbody>
              {alertsList.map((alert) => (
                <tr key={alert.id}>
                  <td>{formatISODatetime(alert.datetime).replace('Z', '')}</td>
                  <td>{alert.title}</td>
                  <td>{alert.ticker}</td>
                  <td>{Number(alert.price).toFixed(5)}</td>
                  <td>{alert.action}</td>
                  <td>
                    <button type="button" className="btn btn-link"
                            data-toggle="tooltip" data-placement="top" title="Delete position"
                            onClick={() => handleFillOrder({
                              alert,
                              baseCurrency: tradingData.baseCurrency,
                              secondaryCurrency: tradingData.secondaryCurrency,
                              baseCurrencyAmount: tradingData.currentDepositInBaseCurrency || 0,
                              secondaryCurrencyAmount: tradingData.currentDepositInSecondaryCurrency || 0,
                            })}
                    >
                      <img src="/assets/img/coin.svg"/>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
