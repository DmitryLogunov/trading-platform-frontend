/* eslint-disable */
import { NextPage } from 'next'
import { AdminLayout } from '@layout'
import React from 'react'
import TradingPane from '../../components/app/TradingPane/TradingPane'

type Props = {
  id: string;
}

const Trading: NextPage<Props> = (props) => (
  <AdminLayout>
    <TradingPane tradingId={props.id} />
  </AdminLayout>
)

export const getServerSideProps: (context: any) => Promise<{ props: { id: number | undefined } }> = async (context) => {
  const id = context?.query?.id

  return { props: { id } }
}

export default Trading
