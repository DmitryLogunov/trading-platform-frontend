export interface TradingModel {
  id: string;
  baseCurrency: string;
  secondaryCurrency: string;
  ticker: string;
  baseDeposit: number;
  startedAt: string;
  closedAt: string;
}
