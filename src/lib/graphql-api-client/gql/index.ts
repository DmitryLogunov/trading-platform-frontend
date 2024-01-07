import tradingsMutations from './tradings.mutations.graphql'
import tradingsQueries from './tradings.queries.graphql'
import alertsQueries from './alerts.queries.graphql'
import positionsMutations from './positions.mutations.graphql'
import positionsQueries from './positions.queries.graphql'

export const queries = {
  ...tradingsQueries,
  ...alertsQueries,
  ...positionsQueries,
}

export const mutations = {
  ...tradingsMutations,
  ...positionsMutations,
}
