import React from 'react';
import { motion } from 'framer-motion';
import { ElementPosition } from '../types';
import styles from './Spotlight.module.css';

interface SpotlightProps {
  position: ElementPosition | null;
}

export const Spotlight: React.FC<SpotlightProps> = ({ position }) => {
  if (!position) return null;

  return (
    <>
      <motion.div
        className={styles.spotlight}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          top: position.top - 8,
          left: position.left - 8,
          width: position.width + 16,
          height: position.height + 16
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />
    </>
  );
};
