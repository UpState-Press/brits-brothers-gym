import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  /**
   * Optional. Still supported for existing pages, but not required.
   */
  keywords?: string;
  /**
   * Legacy alias for `ogImage`.
   */
  image?: string;
  /**
   * Legacy alias for `canonicalUrl`.
   */
  url?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
}

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  ogImage,
  ogTitle,
  ogDescription,
  canonicalUrl,
  type = 'website',
}: SEOProps) {
  const siteTitle = title
    ? `${title} | ${siteConfig.business.name}`
    : siteConfig.seo.title;

  const siteDescription = description || siteConfig.seo.description;
  const siteKeywords = keywords || siteConfig.seo.keywords;
  const canonical =
    canonicalUrl || url || (typeof window !== 'undefined' ? window.location.href : '');

  const resolvedOgTitle = ogTitle ?? siteTitle;
  const resolvedOgDescription = ogDescription ?? siteDescription;
  const resolvedOgImage = ogImage ?? image ?? '/og-image.jpg';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:site_name" content={siteConfig.business.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {canonical ? <meta name="twitter:url" content={canonical} /> : null}
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
    </Helmet>
  );
}
