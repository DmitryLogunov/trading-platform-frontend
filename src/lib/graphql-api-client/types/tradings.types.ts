export type Trading = {
    id: string;
    exchange: string;
    baseCurrency: string;
    secondaryCurrency: string;
    baseDepositInBaseCurrency: number;
    currentDepositInBaseCurrency?: number;
    currentDepositInSecondaryCurrency?: number;
    roiInPercent?: number;
    roiInBaseCurrency?: number;
    startedAt: string;
    closedAt?: string;
}

export type NewTradingInput = {
    exchange: string;
    baseCurrency: string;
    secondaryCurrency: string;
    baseDepositInBaseCurrency: number;
    startedAt?: string;
}

export type NewTradingOutput = {
    id: string;
    exchange: string;
    baseCurrency: string;
    secondaryCurrency: string;
    baseDepositInBaseCurrency: number;
    startedAt: string;
}

export type UpdateTradingInput = {
    id: string;
    baseDepositInBaseCurrency?: number;
    currentDepositInBaseCurrency?: number;
    currentDepositInSecondaryCurrency?: number;
    roiInPercent?: number;
    roiInBaseCurrency?: number;
    closedAt?: string;
}