import {NextPage} from "next";
import {AdminLayout} from "@layout";
import React from "react";
import TradingPane from "../../components/app/TradingPane/TradingPane";
import {chartData} from "../../mock-data/chart.data";
import {positionsData} from "../../mock-data/positions.data";

type Props = {
    id: string;
}

const Trading: NextPage<Props> = (props) => {
    return (
        <AdminLayout>
            <TradingPane
                tradingId={props.id}
                chartData={{...chartData}}
                positions={...positionsData}
            />
        </AdminLayout>
    )
}

export const getServerSideProps: (context) => Promise<{ props: { id: number | undefined } }> = async (context) => {
    const id = context?.query?.id;

    return { props: { id } };
}

export default Trading