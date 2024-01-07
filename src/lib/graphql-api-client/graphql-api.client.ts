/* eslint-disable */
import { GraphQLClient } from 'graphql-request'
import { mutations, queries } from '@lib/graphql-api-client/gql'

if (!process.env.NEXT_PUBLIC_GRAPHQL_API_URL) {
  console.log('Error: NEXT_PUBLIC_GRAPHQL_API_URL is undefined')
  process.exit(1)
}

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_URL)

export class GraphQLApiClient {
  /**
   * Sends GraphQL request to API
   *
   * @param gqlRequestName
   * @param params
   * @param gqlName
   */
  static async sendRequest<I, O>(gqlRequestName: string, params?: I, gqlName?: string): Promise<O | undefined> {
    try {
      const qglRequests = { ...mutations, ...queries } as { [key: string]: string }
      if (!Object.keys(qglRequests).includes(gqlRequestName)) {
        throw new Error('Unknown GraphQL request')
      }

      const gqlRequest = qglRequests[gqlRequestName]

      const response = await client.request(gqlRequest, (params || {}) as any) as { [key: string]: O }

      return response[gqlName || gqlRequestName] as O
    } catch (err) {
      console.log('Error: GraphQl API client: ', err)
    }
  }

  /**
   * Checks, parses and refreshes data using useState setter
   *
   * @param gqlQuery
   * @param setData
   * @param checkDataHandler
   * @param parsingDataHandler
   */
  static async refreshData<D, P>(
    gqlQuery: string,
    setData: (data: P) => void,
    checkDataHandler?: (data: D) => boolean,
    parsingDataHandler?: (data: D) => P,
    params?: unknown,
    gqlName?: string,
  ): Promise<P> {
    const data: unknown = await GraphQLApiClient.sendRequest(gqlQuery, params || {}, gqlName)

    if (checkDataHandler && !checkDataHandler(data as D)) return {} as P

    const parsedData = parsingDataHandler ? parsingDataHandler(data as D) : data as P

    setData(parsedData as P)

    return parsedData as P
  }
}
