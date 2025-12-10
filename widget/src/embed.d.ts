import { TourConfig } from './types';
declare class TourWidgetAPI {
    private root;
    private container;
    private isActive;
    init(config: TourConfig): void;
    destroy(): void;
}
declare const tourWidget: TourWidgetAPI;
declare global {
    interface Window {
        TourWidget: TourWidgetAPI;
    }
}
export default tourWidget;
