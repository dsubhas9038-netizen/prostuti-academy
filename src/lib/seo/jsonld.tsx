// JSON-LD Structured Data Generator
// Generates Schema.org structured data for better SEO

import { siteConfig } from './metadata';

// Organization Schema
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        alternateName: siteConfig.nameBn,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icons/icon-512x512.png`,
        sameAs: [
            'https://facebook.com/prostutiacademy',
            'https://twitter.com/prostutiacademy',
            'https://youtube.com/@prostutiacademy',
            'https://instagram.com/prostutiacademy',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-9000000000',
            contactType: 'customer service',
            availableLanguage: ['Bengali', 'English'],
        },
    };
}

// Educational Organization Schema
export function generateEducationalOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: siteConfig.name,
        alternateName: siteConfig.nameBn,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icons/icon-512x512.png`,
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
            addressRegion: 'West Bengal',
        },
        areaServed: {
            '@type': 'State',
            name: 'West Bengal',
        },
    };
}

// Website Schema
export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        alternateName: siteConfig.nameBn,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: ['bn', 'en'],
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

// WebPage Schema
export function generateWebPageSchema({
    title,
    description,
    url,
    datePublished,
    dateModified,
}: {
    title: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: url,
        inLanguage: 'bn',
        isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        datePublished: datePublished || new Date().toISOString(),
        dateModified: dateModified || new Date().toISOString(),
    };
}

// Course Schema (for subjects)
export function generateCourseSchema({
    name,
    nameBn,
    description,
    subjectId,
    provider = siteConfig.name,
}: {
    name: string;
    nameBn: string;
    description: string;
    subjectId: string;
    provider?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `${name} (${nameBn})`,
        description: description,
        url: `${siteConfig.url}/subjects/${subjectId}`,
        provider: {
            '@type': 'Organization',
            name: provider,
            url: siteConfig.url,
        },
        educationalLevel: 'Higher Secondary',
        inLanguage: ['bn', 'en'],
        isAccessibleForFree: true,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
    };
}

// Quiz Schema (for mock tests)
export function generateQuizSchema({
    name,
    description,
    questionCount,
    duration,
    url,
}: {
    name: string;
    description: string;
    questionCount: number;
    duration: number; // in minutes
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: name,
        description: description,
        url: url,
        educationalLevel: 'Higher Secondary',
        numberOfQuestions: questionCount,
        timeRequired: `PT${duration}M`,
        isAccessibleForFree: true,
        inLanguage: ['bn', 'en'],
        provider: {
            '@type': 'Organization',
            name: siteConfig.name,
        },
    };
}

// FAQ Schema
export function generateFAQSchema(
    faqs: Array<{ question: string; answer: string }>
) {
    return {
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
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(
    items: Array<{ name: string; url: string }>
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
        })),
    };
}

// Article Schema (for blog/content pages)
export function generateArticleSchema({
    title,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author = siteConfig.name,
}: {
    title: string;
    description: string;
    url: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        url: url,
        image: image || `${siteConfig.url}${siteConfig.ogImage}`,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Organization',
            name: author,
            url: siteConfig.url,
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/icons/icon-512x512.png`,
            },
        },
        inLanguage: 'bn',
    };
}

// Helper to render JSON-LD script
export function renderJsonLd(schema: object | object[]): string {
    const schemas = Array.isArray(schema) ? schema : [schema];
    return schemas
        .map(
            (s) =>
                `<script type="application/ld+json">${JSON.stringify(s)}</script>`
        )
        .join('\n');
}

// React component for JSON-LD
export function JsonLd({ data }: { data: object | object[] }) {
    const schemas = Array.isArray(data) ? data : [data];

    return (
        <>
        {
            schemas.map((schema, index) => (
                <script
          key= { index }
          type = "application/ld+json"
          dangerouslySetInnerHTML = {{ __html: JSON.stringify(schema) }}
        />
      ))
}
</>
  );
}

export default {
    generateOrganizationSchema,
    generateEducationalOrganizationSchema,
    generateWebsiteSchema,
    generateWebPageSchema,
    generateCourseSchema,
    generateQuizSchema,
    generateFAQSchema,
    generateBreadcrumbSchema,
    generateArticleSchema,
    renderJsonLd,
    JsonLd,
};
