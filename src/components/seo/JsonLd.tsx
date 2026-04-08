interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wafa Technology',
    url: 'https://wafatechnology.com',
    logo: 'https://wafatechnology.com/wp-content/uploads/2025/11/Frame-1597879963.png',
    description:
      'Wafa Technology delivers AI-driven software solutions, full-stack development, mobile app development, and intelligent automation services.',
    sameAs: [
      'https://linkedin.com/company/wafa-technology',
      'https://twitter.com/wafatechnology',
      'https://github.com/wafa-technology',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@wafatechnology.com',
      contactType: 'customer service',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };

  return <JsonLd data={data} />;
}

export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wafa Technology',
    url: 'https://wafatechnology.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://wafatechnology.com/blog?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Wafa Technology',
      url: 'https://wafatechnology.com',
    },
  };

  return <JsonLd data={data} />;
}

export function BlogPostJsonLd({
  title,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wafa Technology',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wafatechnology.com/wp-content/uploads/2025/11/Frame-1597879963.png',
      },
    },
    datePublished,
    dateModified,
  };

  return <JsonLd data={data} />;
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
