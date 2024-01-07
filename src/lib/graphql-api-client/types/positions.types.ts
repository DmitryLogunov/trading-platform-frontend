export type Order = {
  action: string;
  sourceCurrencyAmount: number;
  targetCurrencyAmount: number;
  price: number;
  createdAt: string;
}

export type Position = {
  id: string;
  tradingId: string;
  baseCurrency: string;
  secondaryCurrency: string;
  orders: Order[];
  roiInPercent: number;
  roiInBaseCurrency: number;
  createdAt: string;
  closedAt: string | undefined;
}
