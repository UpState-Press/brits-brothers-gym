import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../lib/analytics';

/**
 * Fires GA4 page_view on React Router navigations.
 * gtag is initialized in index.html with send_page_view: false to avoid duplicate hits
 * on first load; this component owns all SPA page_view events.
 */
export function RouteAnalytics() {
  const { pathname, search, hash } = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const pagePath = `${pathname}${search}${hash}`;

    if (lastTrackedPath.current === pagePath) {
      return;
    }

    lastTrackedPath.current = pagePath;
    trackPageView(pagePath);
  }, [pathname, search, hash]);

  return null;
}
