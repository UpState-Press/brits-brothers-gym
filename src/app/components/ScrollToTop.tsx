import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll to top on route changes. Preserves hash navigation (e.g. #pricing on home).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
