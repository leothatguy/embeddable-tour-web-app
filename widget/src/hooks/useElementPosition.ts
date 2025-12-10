import { useState, useEffect } from 'react';
import { ElementPosition } from '../types';

export const useElementPosition = (selector?: string): ElementPosition | null => {
  const [position, setPosition] = useState<ElementPosition | null>(null);

  useEffect(() => {
    if (!selector) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const element = document.querySelector(selector);
      if (!element) {
        setPosition(null);
        return;
      }

      const rect = element.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      });

      // Scroll element into view if not visible
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    };

    updatePosition();

    // Update on scroll and resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [selector]);

  return position;
};
