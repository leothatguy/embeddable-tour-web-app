import React from 'react';
import { TourConfig } from '../types';
interface TourWidgetProps {
    config: TourConfig;
    onClose: () => void;
}
export declare const TourWidget: React.FC<TourWidgetProps>;
export {};
