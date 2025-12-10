import { TourStep } from '../types';
interface UseTourStateProps {
    tourId: string;
    steps: TourStep[];
    onComplete?: () => void;
    onStepChange?: (stepIndex: number, step: TourStep) => void;
}
export declare const useTourState: ({ tourId, steps, onComplete, onStepChange }: UseTourStateProps) => {
    currentStepIndex: number;
    currentStep: TourStep;
    isFirstStep: boolean;
    isLastStep: boolean;
    progress: number;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    skipTour: () => void;
};
export {};
