import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TourStep } from '../types';
import styles from './StepContent.module.css';

interface StepContentProps {
	step: TourStep;
}

export const StepContent: React.FC<StepContentProps> = ({ step }) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={step.id}
				className={styles.container}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.3 }}>
				<h2 className={styles.title}>{step.title}</h2>
				<p className={styles.description}>{step.description}</p>
			</motion.div>
		</AnimatePresence>
	);
};
