/* eslint-disable */
import { gql } from 'graphql-request'

const getAlerts = gql`
    query getAlerts($ticker: String!, $createdAtFrom: String!) {
        getAlerts(
          filters: {
             ticker: $ticker,
             createdAtFrom: $createdAtFrom
          }
        ) {
            id
            title
            ticker
            action
            price
            createdAt
        }
    }
`

export default {
  getAlerts,
}
