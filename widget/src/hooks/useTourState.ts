import { useState, useCallback, useEffect } from 'react';
import { TourStep } from '../types';
import { StorageService } from '../services/storage';
import { analytics } from '../services/analytics';

interface UseTourStateProps {
	tourId: string;
	steps: TourStep[];
	onComplete?: () => void;
	onStepChange?: (stepIndex: number, step: TourStep) => void;
}

// Generate a simple session ID
const generateSessionId = () => {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useTourState = ({ tourId, steps, onComplete, onStepChange }: UseTourStateProps) => {
	// Try to resume from localStorage
	const [sessionId] = useState(() => {
		const stored = StorageService.loadState(tourId);
		return stored?.sessionId || generateSessionId();
	});

	const [currentStepIndex, setCurrentStepIndex] = useState(() => {
		const stored = StorageService.loadState(tourId);
		return stored?.currentStepIndex || 0;
	});

	const currentStep = steps[currentStepIndex];

	// Save state to localStorage whenever it changes
	useEffect(() => {
		StorageService.saveState(tourId, {
			currentStepIndex,
			sessionId,
			lastUpdated: Date.now(),
		});
	}, [currentStepIndex, tourId, sessionId]);

	// Track step changes
	useEffect(() => {
		if (currentStep) {
			analytics.track({
				type: 'step_started',
				tourId,
				stepId: currentStep.id,
				stepIndex: currentStepIndex,
				timestamp: Date.now(),
				sessionId,
			});

			onStepChange?.(currentStepIndex, currentStep);
		}
	}, [currentStepIndex, currentStep, tourId, sessionId, onStepChange]);

	const goToNextStep = useCallback(() => {
		if (currentStepIndex < steps.length - 1) {
			analytics.track({
				type: 'step_completed',
				tourId,
				stepId: currentStep.id,
				stepIndex: currentStepIndex,
				timestamp: Date.now(),
				sessionId,
			});
			setCurrentStepIndex((prev) => prev + 1);
		} else {
			// Tour completed
			analytics.track({
				type: 'tour_completed',
				tourId,
				timestamp: Date.now(),
				sessionId,
			});
			StorageService.clearState(tourId);
			onComplete?.();
		}
	}, [currentStepIndex, steps.length, tourId, currentStep, sessionId, onComplete]);

	const goToPreviousStep = useCallback(() => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex((prev) => prev - 1);
		}
	}, [currentStepIndex]);

	const skipTour = useCallback(() => {
		analytics.track({
			type: 'tour_skipped',
			tourId,
			stepId: currentStep.id,
			stepIndex: currentStepIndex,
			timestamp: Date.now(),
			sessionId,
		});
		StorageService.clearState(tourId);
	}, [tourId, currentStep, currentStepIndex, sessionId]);

	return {
		currentStepIndex,
		currentStep,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		progress: ((currentStepIndex + 1) / steps.length) * 100,
		goToNextStep,
		goToPreviousStep,
		skipTour,
	};
};
