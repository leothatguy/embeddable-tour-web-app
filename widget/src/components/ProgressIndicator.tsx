import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProgressIndicator.module.css';

interface ProgressIndicatorProps {
	currentStep: number;
	totalSteps: number;
	progress: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps, progress }) => {
	return (
		<div className={styles.container}>
			<div className={styles.stepCounter}>
				Step {currentStep + 1} of {totalSteps}
			</div>
			<div className={styles.progressBar}>
				<motion.div
					className={styles.progressFill}
					initial={{ width: 0 }}
					animate={{ width: `${progress}%` }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
				/>
			</div>
		</div>
	);
};
