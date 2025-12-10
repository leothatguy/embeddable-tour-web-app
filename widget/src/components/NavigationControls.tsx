import React from 'react';
import styles from './NavigationControls.module.css';

interface NavigationControlsProps {
	onNext: () => void;
	onBack: () => void;
	onSkip: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
	onNext,
	onBack,
	onSkip,
	isFirstStep,
	isLastStep,
}) => {
	return (
		<div className={styles.container}>
			<button className={styles.skipButton} onClick={onSkip} type="button">
				Skip Tour
			</button>

			<div className={styles.navigationButtons}>
				<button className={styles.backButton} onClick={onBack} disabled={isFirstStep} type="button">
					← Back
				</button>
				<button className={styles.nextButton} onClick={onNext} type="button">
					{isLastStep ? 'Finish' : 'Next →'}
				</button>
			</div>
		</div>
	);
};
