/* eslint-disable */
import { gql } from 'graphql-request'

const openPosition = gql`
    mutation openPosition($tradingId: String!, $baseCurrencyAmount: Float!, $price: Float!) {
        openPosition(input: {
          tradingId: $tradingId,
          baseCurrencyAmount: $baseCurrencyAmount,
          price: $price  
        }) {
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

const closePosition = gql`
    mutation closePosition($id: String!, $price: Float!) {
        closePosition(input: { 
           id: $id,
           price: $price   
        }) {
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
  openPosition,
  closePosition,
}
