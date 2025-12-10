import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TourConfig } from '../types';
import { useTourState } from '../hooks/useTourState';
import { useElementPosition } from '../hooks/useElementPosition';
import { analytics } from '../services/analytics';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationControls } from './NavigationControls';
import { StepContent } from './StepContent';
import { Spotlight } from './Spotlight';
import styles from './TourWidget.module.css';

// Lazy load avatar to keep bundle size small
const Avatar = lazy(() => import('./Avatar/Avatar').then((module) => ({ default: module.Avatar })));

interface TourWidgetProps {
	config: TourConfig;
	onClose: () => void;
}

export const TourWidget: React.FC<TourWidgetProps> = ({ config, onClose }) => {
	const { currentStepIndex, currentStep, isFirstStep, isLastStep, progress, goToNextStep, goToPreviousStep, skipTour } =
		useTourState({
			tourId: config.tourId,
			steps: config.steps,
			onComplete: () => {
				config.onComplete?.();
				onClose();
			},
			onStepChange: config.onStepChange,
		});

	const elementPosition = useElementPosition(currentStep?.target);

	const handleSkip = () => {
		skipTour();
		config.onSkip?.();
		onClose();
	};

	// Initialize analytics
	React.useEffect(() => {
		analytics.initialize(config.onAnalytics);
		analytics.track({
			type: 'tour_started',
			tourId: config.tourId,
			timestamp: Date.now(),
			sessionId: `${Date.now()}`,
		});
	}, [config]);

	const theme = config.theme || {};
	const avatarEnabled = config.avatar?.enabled ?? false;
	const avatarPosition = config.avatar?.position || 'right';

	return (
		<>
			<Spotlight position={elementPosition} />

			<div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
				<AnimatePresence>
					<motion.div
						className={`${styles.container} ${avatarEnabled ? styles.withAvatar : ''}`}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						style={{
							backgroundColor: theme.backgroundColor,
							borderRadius: theme.borderRadius,
							color: theme.textColor,
						}}>
						{avatarEnabled && (
							<div className={`${styles.avatarContainer} ${styles[avatarPosition]}`}>
								<Suspense fallback={<div className={styles.avatarPlaceholder} />}>
									<Avatar stepIndex={currentStepIndex} />
								</Suspense>
							</div>
						)}

						<div className={styles.content}>
							<ProgressIndicator currentStep={currentStepIndex} totalSteps={config.steps.length} progress={progress} />

							<div className={styles.stepContent}>
								<StepContent step={currentStep} />
							</div>

							<NavigationControls
								onNext={goToNextStep}
								onBack={goToPreviousStep}
								onSkip={handleSkip}
								isFirstStep={isFirstStep}
								isLastStep={isLastStep}
							/>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	);
};
