import { Helmet } from 'react-helmet-async';
import { getPublicSiteOrigin, siteConfig } from '../../config/siteConfig';

/**
 * Structured data (JSON-LD) for local business
 * Helps search engines understand the business and show rich results
 */
export function LocalBusinessSchema() {
  const origin = getPublicSiteOrigin();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Gym",
    "name": siteConfig.business.name,
    "image": origin
      ? `${origin}${siteConfig.seo.defaultOgImage}`
      : siteConfig.seo.defaultOgImage,
    "description": siteConfig.seo.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address.street,
      "addressLocality": siteConfig.contact.address.city,
      "addressRegion": siteConfig.contact.address.state,
      "postalCode": siteConfig.contact.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.8454664",
      "longitude": "-82.355276"
    },
    "url":
      getPublicSiteOrigin() ||
      (typeof window !== 'undefined' ? window.location.origin : ''),
    "telephone": siteConfig.contact.phone.mainRaw,
    "email": siteConfig.contact.email,
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "06:00",
        "closes": "20:00",
        "description": "Personal Training Hours"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "06:00",
        "closes": "19:00",
        "description": "Personal Training Hours"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00",
        "description": "Personal Training Hours"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "05:00",
        "closes": "23:59",
        "description": "Open Gym - Unrestricted Access"
      }
    ],
    "sameAs": [
      // Add social media URLs when available
      ...(siteConfig.social.facebook ? [siteConfig.social.facebook] : []),
      ...(siteConfig.social.instagram ? [siteConfig.social.instagram] : []),
      ...(siteConfig.social.youtube ? [siteConfig.social.youtube] : []),
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Personal Training",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Open Gym Access",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Boxing",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Student Training",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Strongman & Powerlifting Equipment",
        "value": true
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
