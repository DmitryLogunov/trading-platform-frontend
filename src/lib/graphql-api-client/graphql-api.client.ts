import {GraphQLClient, gql} from 'graphql-request';
import {queries, mutations} from "@lib/graphql-api-client/gql";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_URL);

export class GraphQLApiClient {
  /**
   * Sends GraphQL request to API
   *
   * @param gqlRequestName
   * @param params
   * @param gqlName
   */
  static async sendRequest<I, O>(gqlRequestName: string, params?: I, gqlName?: string): Promise<O> {
    try {
      const qglRequests = {...mutations, ...queries};
      if (!Object.keys(qglRequests).includes(gqlRequestName)) {
        throw new Error(`Unknown GraphQL request`)
      }

      const gqlRequest = qglRequests[gqlRequestName];

      const response = await client.request(gqlRequest, (params || {}) as any);

      return response[gqlName || gqlRequestName] as O;
    } catch (err) {
      console.log('Error: GraphQl API client: ', err);
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
    const data: D = await GraphQLApiClient.sendRequest(gqlQuery, params || {}, gqlName) as D;

    if (checkDataHandler && !checkDataHandler(data)) return;

    const parsedData = parsingDataHandler ? parsingDataHandler(data) : data;

    setData(parsedData);

    return parsedData;
  }
}