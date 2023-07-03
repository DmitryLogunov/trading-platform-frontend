import {gql} from 'graphql-request';

const getTradings = gql`
    query {
        getTradings {
            id
            exchange
            baseCurrency
            secondaryCurrency
            baseDepositInBaseCurrency
            currentDepositInBaseCurrency
            currentDepositInSecondaryCurrency
            roiInPercent
            roiInBaseCurrency
            startedAt 
            closedAt
        }
    }
`;

const getTradingByID = gql`
    query getTradingByID($id: String!){
        getTradingByID(id: $id) {
            id
            exchange
            baseCurrency
            secondaryCurrency
            baseDepositInBaseCurrency
            currentDepositInBaseCurrency
            currentDepositInSecondaryCurrency
            roiInPercent
            roiInBaseCurrency
            startedAt 
            closedAt
        }
    }
`;

export default {
  getTradings,
  getTradingByID,
}