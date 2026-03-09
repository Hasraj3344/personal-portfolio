import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '../../utils/seo';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData
}) => {
  const seo = {
    title: title || seoConfig.defaultTitle,
    description: description || seoConfig.defaultDescription,
    image: image || seoConfig.defaultImage,
    url: url || seoConfig.siteUrl,
    keywords: keywords || seoConfig.keywords.join(', ')
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seoConfig.author} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Haswanth Rajesh Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {seoConfig.twitterUsername && (
        <meta name="twitter:creator" content={seoConfig.twitterUsername} />
      )}

      <link rel="canonical" href={seo.url} />

      {(structuredData || seoConfig.structuredData) && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData || seoConfig.structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
