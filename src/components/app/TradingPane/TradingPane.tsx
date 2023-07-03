import { Card, ProgressBar } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import React, {useEffect, useState} from 'react'
import AlertsList from "@components/app/TradingPane/AlertsList";
import {chartOptions} from "@components/app/TradingPane/const/chart-options.const";
import TradingInfo from "@components/app/TradingPane/TradingInfo";
import PositionsList from "@components/app/TradingPane/PositionsList";
import {PositionsModel} from "@models/positions.model";
import NewOrderForm, {NewOrderData} from "@components/app/TradingPane/NewOrderForm";
import {formatISODatetime} from "@lib/helpers";
import {Trading} from "@lib/graphql-api-client/types";
import {GraphQLApiClient} from "@lib/graphql-api-client";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

type Props = {
  tradingId: number;
  chartData: unknown;
  positions: PositionsModel[];
}
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export default function TradingPane(props: Props) {
  const { tradingId, chartData, positions } = props;

  const [orderData, setOrderData] = useState({})
  const [tradingData, setTradingData] = useState({} as Trading);
  let isDataLoaded = false;

  const refreshTradingData = async (): Promise<Trading> => {
    return GraphQLApiClient.refreshData(
      'getTradingByID',
      setTradingData,
      (data: Trading) => !!data.id,
      undefined,
      {id: tradingId}
    );
  }

  useEffect(() => {
    if (isDataLoaded) return;
    isDataLoaded = true;

    (async () => {
      await refreshTradingData();

      const defaultNewOrderData: NewOrderData = {
        datetime: formatISODatetime(new Date().toISOString()),
        action: 'buy',
        amount: 0.0,
        price: 0.0,
      }

      setOrderData(defaultNewOrderData);
    })();
  }, []);

  const refreshOrderData = () => {
    const refreshedOrderData: NewOrderData = {
      datetime: formatISODatetime(new Date().toISOString()),
      action: random(0, 2) > 1 ? 'buy' : 'sell',
      amount: random(1000, 10000),
      price: Math.random()*random(10, 100).toFixed(2),
    }

    setOrderData(refreshedOrderData);
  }

  return (
      <div>
        <TradingInfo tradingData={tradingData} refreshTradingData={refreshTradingData}/>

        <div className="row">
          <div className="col-sm-6 align-items-stretch" style={{height: "500px", paddingBottom: "10px"}}>
            <Card className="mb-4" style={{height: "100%"}}>
              <Card.Body>
                <div style={{height: "100%"}}>
                  <Line data={{...chartData}} options={{...chartOptions}} />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="row row-cols-1 row-cols-md-5 text-center">
                  <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50">Visits</div>
                    <div className="fw-semibold">29.703 Users (40%)</div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="success"
                        now={40}
                    />
                  </div>
                  <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50">Unique</div>
                    <div className="fw-semibold">24.093 Users (20%)</div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="info"
                        now={20}
                    />
                  </div>
                  <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50">Page views</div>
                    <div className="fw-semibold">78.706 Views (60%)</div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="warning"
                        now={60}
                    />
                  </div>
                  <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50">New Users</div>
                    <div className="fw-semibold">22.123 Users (80%)</div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="danger"
                        now={80}
                    />
                  </div>
                  <div className="col mb-sm-2 mb-0">
                    <div className="text-black-50">Bounce Rate</div>
                    <div className="fw-semibold">40.15%</div>
                    <ProgressBar
                        className="progress-thin mt-2"
                        variant="primary"
                        now={40}
                    />
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </div>

          <div className="col-sm-6 align-items-stretch" style={{height: "500px", paddingBottom: "10px"}}>
            <Card className="mb-4" style={{height: "100%"}}>
              <div className="justify-content-between">
                <div>
                  <h4  className="pt-2" style={{paddingLeft: "1rem !important", marginBottom: "0rem"}}>Alerts</h4>
                </div>
              </div>
              <Card.Body>
                <div style={{height: "400px", overflow: "hidden", overflowY: "scroll"}}>
                  <AlertsList tradingData={tradingData} setOrderData={setOrderData}/>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-9 align-items-stretch">
            <Card className="mb-4">
              <div className="justify-content-between">
                <div>
                  <h4  className="p-2" style={{paddingLeft: "1rem !important", marginBottom: "0rem"}}>Positions</h4>
                </div>
              </div>
              <Card.Body>
                <div style={{height: "200px", overflow: "hidden", overflowY: "scroll"}}>
                  <PositionsList positions={positions || []}/>
                </div>
              </Card.Body>
            </Card>
          </div>

          <NewOrderForm tradingData={tradingData} orderData={orderData} refreshOrderData={refreshOrderData}/>
        </div>
      </div>

  )
}

