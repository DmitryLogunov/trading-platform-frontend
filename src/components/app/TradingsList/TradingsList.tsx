import {Card, Table} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import NewTradingForm from "@components/app/TradingsList/NewTradingForm";
import {TradingActionsMenu} from "@components/app/TradingsList/TradingActionsMenu";
import {TradingModel} from "@models/trading.model";
import {GraphQLApiClient} from "@lib/graphql-api-client";
import {Trading} from "@lib/graphql-api-client/types";

const toggleIsShowTradingForm = (isVisible: boolean, setIsShowNewTradingForm: (visible: boolean) => void) => {
  setIsShowNewTradingForm(!isVisible)
}

export default function TradingsList() {
  const [isShowNewTradingForm, setIsShowNewTradingForm] = useState(false);
  const [tradingsList, setTradingsList] = useState([] as TradingModel[]);
  let isDataLoaded = false;

  const refreshTradingsList = async () => {
    const parsingTradingsHandler = (data: Trading[]) => {
      return data.map(t => ({
        id: t.id,
        baseCurrency: t.baseCurrency,
        secondaryCurrency: t.secondaryCurrency,
        ticker: `${t.secondaryCurrency}${t.baseCurrency}`,
        baseDeposit: t.baseDepositInBaseCurrency,
        startedAt: t.startedAt,
        closedAt: t.closedAt || ''
      })) as TradingModel[];
    };

    return GraphQLApiClient.refreshData(
      'getTradings',
      setTradingsList,
      (data: Trading[]) => Array.isArray(data) && data.length > 0,
      parsingTradingsHandler,
    );
  }

  useEffect(() => {
    if (isDataLoaded) return;
    isDataLoaded = true;

    (async () => { await refreshTradingsList() })();
  }, []);

  return (
    <div>
      {isShowNewTradingForm ?
        <NewTradingForm callback={() => {
          toggleIsShowTradingForm(isShowNewTradingForm, setIsShowNewTradingForm);
          refreshTradingsList().then();
        }}/>
        : null}

      <Card>
        <Card.Header>
          Tradings
          {!isShowNewTradingForm ?
            <button type="button" className="btn btn-link m-lg-2"
                    style={{position: "absolute", top: "-0.5rem", left: "4rem"}}
                    data-toggle="tooltip" data-placement="top" title="Show new trading pane form"
                    onClick={() => toggleIsShowTradingForm(isShowNewTradingForm, setIsShowNewTradingForm)}
            >
              <img src="/assets/img/plus-square-dotted.svg"/>
            </button> :
            null
          }
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover>
            <thead className="bg-light">
            <tr>
              <th>Started</th>
              <th>Ticker</th>
              <th>Base deposit</th>
              <th>Closed</th>
              <th aria-label="Action"/>
            </tr>
            </thead>
            <tbody>
            {tradingsList.map((trading) => (
              <tr key={trading.startedAt}>
                <td>{trading.startedAt}</td>
                <td>{trading.ticker}</td>
                <td>{trading.baseDeposit}</td>
                <td>{trading.closedAt}</td>
                <td>
                  <TradingActionsMenu
                    tradingId={trading.id}
                    closedAt={trading.closedAt || null}
                    callback={refreshTradingsList}/>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

