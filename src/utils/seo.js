export const seoConfig = {
  defaultTitle: 'Haswanth Rajesh Neelam - Azure Data Engineer & Full Stack Developer',
  titleTemplate: '%s | Haswanth Rajesh',
  defaultDescription: 'Experienced Azure Data Engineer and Full Stack Developer specializing in data pipelines, cloud solutions (Azure & AWS), React, and data visualization. View my portfolio of data engineering projects and web applications.',
  siteUrl: window.location.origin,
  defaultImage: `${window.location.origin}/logo192.png`,
  twitterUsername: '@haswanth_rajesh',
  author: 'Haswanth Rajesh Neelam',
  keywords: [
    'Azure Data Engineer',
    'Data Engineer',
    'Full Stack Developer',
    'React Developer',
    'Azure Databricks',
    'Data Pipelines',
    'Azure Data Factory',
    'AWS',
    'Power BI',
    'Data Visualization',
    'ETL',
    'Data Warehouse',
    'Web Developer',
    'Portfolio',
    'Haswanth Rajesh'
  ],

  pages: {
    home: {
      title: 'Haswanth Rajesh Neelam - Azure Data Engineer & Full Stack Developer',
      description: 'Experienced Azure Data Engineer and Full Stack Developer with expertise in building scalable data pipelines, cloud solutions, and modern web applications. Specialized in Azure, AWS, React, and data analytics.',
      keywords: ['Azure Data Engineer', 'Data Engineer Portfolio', 'Full Stack Developer', 'Cloud Solutions', 'React Developer']
    }
  },

  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Haswanth Rajesh Neelam',
    url: window.location.origin,
    image: `${window.location.origin}/logo192.png`,
    jobTitle: 'Azure Data Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'DatafactZ LLC'
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'University of Texas at Arlington',
        sameAs: 'https://www.uta.edu/'
      },
      {
        '@type': 'Organization',
        name: 'Amrita Vishwa Vidyapeetham',
        sameAs: 'https://www.amrita.edu/'
      }
    ],
    knowsAbout: [
      'Azure Data Engineering',
      'Azure Data Factory',
      'Azure Databricks',
      'AWS',
      'React',
      'Full Stack Development',
      'Data Pipelines',
      'ETL',
      'Power BI',
      'Data Visualization'
    ],
    sameAs: [
      'https://www.linkedin.com/in/haswanth-rajesh-neelam-627673198/',
      'https://www.instagram.com/haswanth_rajesh/',
      'https://github.com/haswanth'
    ]
  }
};

export const getPageSEO = (page = 'home') => {
  const pageSEO = seoConfig.pages[page] || seoConfig.pages.home;

  return {
    title: pageSEO.title || seoConfig.defaultTitle,
    description: pageSEO.description || seoConfig.defaultDescription,
    keywords: [...seoConfig.keywords, ...(pageSEO.keywords || [])].join(', '),
    image: pageSEO.image || seoConfig.defaultImage,
    url: `${seoConfig.siteUrl}${pageSEO.path || ''}`
  };
};
