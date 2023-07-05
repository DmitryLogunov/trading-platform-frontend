import React from "react";

import {Card, ProgressBar} from "react-bootstrap";
import {Line} from "react-chartjs-2";
import {chartOptions} from "@components/core/ChartJS/const/chart-options.const";
import {chartData} from "../../../mock-data/chart.data";

export default function ChartJS() {
  return (
    <>
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
    </>
  )
}