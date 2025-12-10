import React from 'react';
interface NavigationControlsProps {
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
}
export declare const NavigationControls: React.FC<NavigationControlsProps>;
export {};
