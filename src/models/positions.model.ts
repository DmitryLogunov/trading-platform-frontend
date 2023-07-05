export interface PositionsModel {
    id: string;
    ticker: string;
    openedAt: string;
    openedPrice: number;
    closedAt: string;
    closedPrice: number;
    roiInPercent: number;
    roiInUSDT: number;
}