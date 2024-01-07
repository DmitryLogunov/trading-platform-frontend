/* eslint-disable */
import { gql } from 'graphql-request'

const getPositions = gql`
    query getPositions($tradingId: String!) {
        getPositions(tradingId: $tradingId) {
           id 
           tradingId 
           baseCurrency 
           secondaryCurrency
           orders {
               action
               sourceCurrencyAmount
               targetCurrencyAmount
               price
               createdAt
           }
           roiInPercent
           roiInBaseCurrency
           createdAt
           closedAt
        }
    }
`

export default {
  getPositions,
}
