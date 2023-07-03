export interface TradingModel {
  id: number;
  baseCurrency: string;
  secondaryCurrency: string;
  ticker: string;
  baseDeposit: number;
  startedAt: string;
  closedAt: string;
}
