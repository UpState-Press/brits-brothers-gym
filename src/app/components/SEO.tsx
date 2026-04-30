import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function SEO({
  title,
  description,
  keywords,
  image = '/og-image.jpg', // Default OG image
  url,
  type = 'website',
}: SEOProps) {
  const siteTitle = title
    ? `${title} | ${siteConfig.business.name}`
    : siteConfig.seo.title;

  const siteDescription = description || siteConfig.seo.description;
  const siteKeywords = keywords || siteConfig.seo.keywords;
  const currentUrl = url || typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteConfig.business.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
}
