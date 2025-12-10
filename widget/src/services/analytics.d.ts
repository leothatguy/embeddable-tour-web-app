import { AnalyticsEvent } from '../types';
declare class AnalyticsService {
    private callback?;
    initialize(callback?: (event: AnalyticsEvent) => void): void;
    track(event: AnalyticsEvent): void;
}
export declare const analytics: AnalyticsService;
export {};
