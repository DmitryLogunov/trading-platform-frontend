import tradingMutations from './tradings.mutations.graphql';
import tradingQueries from './tradings.queries.graphql';
import alertsQueries from './alerts.queries.graphql';

export const queries = {
  ...tradingQueries,
  ...alertsQueries,
}

export const mutations = {
  ...tradingMutations,
}