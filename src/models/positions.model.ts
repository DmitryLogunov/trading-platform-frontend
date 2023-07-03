export interface PositionsModel {
    id: number;
    ticker: string;
    openedAt: string;
    openedPrice: number;
    closedAt: string;
    closedPrice: number;
    roiInPercent: number;
    roiInUSDT: number;
}