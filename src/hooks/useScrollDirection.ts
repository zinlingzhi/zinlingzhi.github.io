import React, { useState, useEffect } from 'react';

const SCROLL_UP = 'UP';
const SCROLL_DOWN = 'DOWN';
const isBrowser = typeof window !== 'undefined';
const useScrollDirection = (props: any = {}) => {
  const { initialDirection, thresholdPixels, off } = props;
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = 0; 
    let ticking = false;
    if (isBrowser) {
      lastScrollY = window.scrollY;
    }

    const updateScrollDir = () => {
      if (isBrowser) {
        const scrollY = window.scrollY;
        if (Math.abs(scrollY - lastScrollY) < threshold) {
          ticking = false;
          return;
        }
      }
      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    }

    const onScroll = () => {
      if (!ticking && isBrowser) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    }

    !off&&isBrowser ? window.addEventListener('scroll', onScroll) : setScrollDir(initialDirection);

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
}

export default useScrollDirection;
