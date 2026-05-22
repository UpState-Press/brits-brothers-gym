/** GA4 measurement ID — loaded via gtag.js in index.html. */
export const GA_MEASUREMENT_ID = 'G-9TZCZP31QC';

/**
 * True only in a real browser session (not Node during build scripts).
 * Skips Puppeteer prerender runs so static builds do not emit analytics hits.
 */
export function isAnalyticsClient(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  if (navigator.webdriver) {
    return false;
  }
  return true;
}

/**
 * Send a GA4 page_view for the current SPA route via gtag config.
 * Call from React after route changes; initial automatic page_view is disabled in index.html.
 */
export function trackPageView(pagePath: string): void {
  if (!isAnalyticsClient()) {
    return;
  }

  const gtag = window.gtag;
  if (typeof gtag !== 'function') {
    return;
  }

  gtag('config', GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: document.title,
    page_location: window.location.href,
  });
}
