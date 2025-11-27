import { useEffect } from 'react';

export function useExitIntent(onTrigger: () => void) {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse goes above the viewport top edge
      if (e.clientY <= 0) {
        onTrigger();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [onTrigger]);
}