import {gql} from 'graphql-request';

const createTrading = gql`
    mutation createTrading(
      $exchange: String!,
      $baseCurrency: String!,
      $secondaryCurrency: String!,
      $baseDepositInBaseCurrency: Float!,
      $startedAt: String
    ) {
        createTrading(
            input: {
                exchange: $exchange,
                baseCurrency: $baseCurrency,
                secondaryCurrency: $secondaryCurrency,
                baseDepositInBaseCurrency: $baseDepositInBaseCurrency,
                startedAt: $startedAt
            }
    )   {
            id
            exchange
            baseCurrency
            secondaryCurrency
            baseDepositInBaseCurrency
            startedAt  
        }
    }
`;

const closeTrading = gql`
    mutation updateTrading(
            $id: String!,
            $closedAt: String!
        ){
            updateTrading(
                input: {
                    id: $id, 
                    closedAt: $closedAt          
                }
        ) {  
            id  
        }
    }
`;

const restartTrading = gql`
    mutation updateTrading($id: String!){
            updateTrading(
                input: {
                    id: $id, 
                    closedAt: "null"          
                }
        ) {  
            id  
        }
    }
`;

const deleteTrading = gql`
    mutation deleteTrading($id: String!) {
        deleteTrading(id: $id)   
    }
`;

export default {
  createTrading,
  closeTrading,
  restartTrading,
  deleteTrading,
}