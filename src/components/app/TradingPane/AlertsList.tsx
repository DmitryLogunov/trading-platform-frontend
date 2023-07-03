import { Table } from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {AlertsModel} from "@models/alerts.model";
import {NewOrderData} from "@components/app/TradingPane/NewOrderForm";
import {Trading} from "@lib/graphql-api-client/types";
import {GraphQLApiClient} from "@lib/graphql-api-client";
import {Alert} from "@lib/graphql-api-client/types/alerts.types";

type Props = {
  tradingData: Trading;
  setOrderData: (orderData: NewOrderData) => void;
}

export default function AlertsList(props: Props) {
  const { tradingData, setOrderData } = props
  const [ alertsList, setAlertsList] = useState([] as AlertsModel[]);
  let isDataLoaded = false;

  const handleCreateOrder = (params: { alert: AlertsModel, baseCurrency: string, secondaryCurrency: string}) => {
      const { alert: {datetime, action, price}, baseCurrency, secondaryCurrency } = params;

      setOrderData({
          datetime,
          baseCurrency,
          secondaryCurrency,
          action: action === 'buy' ? 'buy' : 'sell',
          amount: 0,
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
          action: t.action == 0 ? 'buy' : 'sell',
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
      <Table responsive bordered hover>
          <tbody>
          {alertsList.map((alert) => (
              <tr key={alert.id}>
                  <td>{alert.datetime}</td>
                  <td>{alert.title}</td>
                  <td>{alert.ticker}</td>
                  <td>{alert.price}</td>
                  <td>{alert.action}</td>
                  <td>
                      <button type="button" className="btn btn-link"
                              data-toggle="tooltip" data-placement="top" title="Delete position"
                              onClick={() => handleCreateOrder({
                                alert,
                                baseCurrency: tradingData.baseCurrency,
                                secondaryCurrency: tradingData.secondaryCurrency
                              })}
                      >
                          <img src="/assets/img/coin.svg"/>
                      </button>
                  </td>
              </tr>
          ))}
          </tbody>
      </Table>
  )
}
