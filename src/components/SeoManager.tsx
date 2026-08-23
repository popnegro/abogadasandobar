import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { FAQS, LAWYER_INFO, SERVICES } from '../data/lawyerData';

const SITE_ORIGIN = 'https://abogadasandobar.com.ar';
const SITE_NAME = 'Dra. Emilia Sandobar';
const DEFAULT_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

type PageKey =
  | 'home'
  | 'services'
  | 'experience'
  | 'method'
  | 'faq'
  | 'contact';

type MetaEntry = {
  name?: string;
  property?: string;
  content: string;
};

type SchemaObject = Record<string, unknown>;

const PAGE_META: Record<
  PageKey,
  {
    title: string;
    description: string;
    keywords: string;
    breadcrumb: string;
  }
> = {
  home: {
    title: 'Abogada penalista en Mendoza | Dra. Emilia Sandobar',
    description:
      'Dra. Emilia Sandobar, abogada penalista en Mendoza. Defensa técnica, querellas, urgencias penales 24 horas y asesoría corporativa para personas y empresas.',
    keywords:
      'abogada penalista Mendoza, defensa penal Mendoza, querellas penales Mendoza, urgencia penal 24 horas Mendoza, asesoría corporativa Mendoza',
    breadcrumb: 'Inicio',
  },
  services: {
    title: 'Servicios de abogacía penal en Mendoza | Dra. Emilia Sandobar',
    description:
      'Servicios de abogacía penal en Mendoza: defensa penal técnica, delitos económicos, compliance penal para empresas y urgencias penales 24 horas.',
    keywords:
      'abogado penal económico Mendoza, compliance penal empresas Mendoza, delitos societarios Mendoza, urgencia penal 24 horas Mendoza, defensa penal Mendoza',
    breadcrumb: 'Servicios',
  },
  experience: {
    title: 'Trayectoria penal y corporativa en Mendoza | Dra. Emilia Sandobar',
    description:
      'Trayectoria de la Dra. Emilia Sandobar en litigación penal, querellas y asesoría corporativa ante el Polo Judicial Penal de Mendoza y los fueros federales con asiento en la provincia.',
    keywords:
      'experiencia penal Mendoza, abogada penalista Mendoza, litigación penal Mendoza, querella particular Mendoza, derecho penal económico Mendoza',
    breadcrumb: 'Experiencia',
  },
  method: {
    title: 'Nuestro método de trabajo | Dra. Emilia Sandobar',
    description:
      'Conozca el método de trabajo de la Dra. Emilia Sandobar: escucha, diagnóstico, estrategia y actuación en causas penales y corporativas en Mendoza.',
    keywords:
      'método de trabajo abogado penal Mendoza, estrategia penal Mendoza, consulta penal Mendoza, asesoría corporativa Mendoza',
    breadcrumb: 'Nuestro método',
  },
  faq: {
    title: 'Preguntas frecuentes | Dra. Emilia Sandobar',
    description:
      'Respuestas sobre honorarios, urgencias penales, querellas, defensa penal y asesoría corporativa en Mendoza.',
    keywords:
      'preguntas frecuentes abogado penal Mendoza, honorarios abogado penal Mendoza, urgencia penal Mendoza, querella Mendoza',
    breadcrumb: 'Preguntas frecuentes',
  },
  contact: {
    title: 'Contacto penal y corporativo en Mendoza | Dra. Emilia Sandobar',
    description:
      'Contacte a la Dra. Emilia Sandobar para una evaluación técnica confidencial de su caso penal o corporativo en Mendoza.',
    keywords:
      'contacto abogado penal Mendoza, consulta penal Mendoza, abogado corporativo Mendoza, urgencia penal Mendoza',
    breadcrumb: 'Contacto',
  },
};

const stripTrailingSlash = (value: string) =>
  value.endsWith('/') && value.length > 1 ? value.slice(0, -1) : value;

const toCanonicalPath = (pageKey: PageKey, pathname: string) => {
  if (pageKey === 'home') {
    return '/inicio';
  }

  if (pageKey === 'method') {
    return '/nuestro-metodo';
  }

  return pathname;
};

const updateMeta = (entry: MetaEntry) => {
  const selector = entry.name
    ? `meta[name="${entry.name}"]`
    : `meta[property="${entry.property}"]`;

  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');

    if (entry.name) {
      tag.setAttribute('name', entry.name);
    }

    if (entry.property) {
      tag.setAttribute('property', entry.property);
    }

    document.head.appendChild(tag);
  }

  tag.setAttribute('content', entry.content);
};

const buildSchemas = (pageKey: PageKey, canonicalUrl: string): SchemaObject[] => {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_ORIGIN}/#person`,
    name: `Dra. ${LAWYER_INFO.name}`,
    jobTitle: LAWYER_INFO.title,
    telephone: LAWYER_INFO.phone,
    email: LAWYER_INFO.email,
    url: SITE_ORIGIN,
    image: DEFAULT_IMAGE,
    description:
      LAWYER_INFO.bio,
    address: {
      '@type': 'PostalAddress',
      streetAddress: LAWYER_INFO.address,
      addressLocality: 'Ciudad de Mendoza',
      addressRegion: 'Mendoza',
      addressCountry: 'AR',
    },
    knowsAbout: [
      'Derecho Penal',
      'Derecho Procesal Penal',
      'Delitos Económicos',
      'Compliance Penal',
      'Querella Particular',
      'Código Procesal Penal de Mendoza',
      'Ley 27.401',
    ],
    sameAs: [LAWYER_INFO.whatsappUrl, 'https://www.colegioabogadosmendoza.org.ar'],
  };

  const offers = SERVICES.map((service, index) => ({
    '@type': 'Offer',
    position: index + 1,
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.shortDesc,
      provider: {
        '@id': `${SITE_ORIGIN}/#legal-service`,
      },
      areaServed: 'Mendoza, Argentina',
    },
  }));

  const serviceSchemas = SERVICES.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_ORIGIN}/#service-${service.id}`,
    name: service.title,
    description: service.fullDesc,
    serviceType: service.title,
    provider: {
      '@id': `${SITE_ORIGIN}/#legal-service`,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Provincia de Mendoza',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Gran Mendoza',
      },
    ],
  }));

  const legalService = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${SITE_ORIGIN}/#legal-service`,
    name: 'Estudio Jurídico Dra. Emilia Sandobar',
    legalName: 'Estudio Jurídico Emilia Sandobar',
    url: SITE_ORIGIN,
    image: DEFAULT_IMAGE,
    description:
      'Estudio jurídico especializado en derecho penal, litigación compleja y asesoría corporativa en Mendoza.',
    telephone: LAWYER_INFO.phone,
    email: LAWYER_INFO.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: LAWYER_INFO.address,
      addressLocality: 'Ciudad de Mendoza',
      addressRegion: 'Mendoza',
      postalCode: 'M5500',
      addressCountry: 'AR',
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Provincia de Mendoza',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Gran Mendoza',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Mendoza Capital',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios jurídicos',
      itemListElement: offers,
    },
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    description: LAWYER_INFO.bio,
    publisher: {
      '@id': `${SITE_ORIGIN}/#legal-service`,
    },
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}/#webpage`,
    url: canonicalUrl,
    name: `${PAGE_META[pageKey].title}`,
    description: PAGE_META[pageKey].description,
    isPartOf: {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    about: {
      '@id': `${SITE_ORIGIN}/#person`,
    },
  };

  const breadcrumbItems: Array<{ name: string; item: string }> = [
    { name: 'Inicio', item: `${SITE_ORIGIN}/inicio` },
  ];

  if (pageKey === 'services') {
    breadcrumbItems.push({
      name: PAGE_META.services.breadcrumb,
      item: canonicalUrl,
    });
  } else if (pageKey === 'experience' || pageKey === 'method') {
    breadcrumbItems.push({
      name: 'Experiencia',
      item: `${SITE_ORIGIN}/experiencia`,
    });

    if (pageKey === 'method') {
      breadcrumbItems.push({
        name: PAGE_META.method.breadcrumb,
        item: `${SITE_ORIGIN}/nuestro-metodo`,
      });
    }
  } else if (pageKey === 'faq') {
    breadcrumbItems.push({
      name: PAGE_META.faq.breadcrumb,
      item: canonicalUrl,
    });
  } else if (pageKey === 'contact') {
    breadcrumbItems.push({
      name: PAGE_META.contact.breadcrumb,
      item: canonicalUrl,
    });
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  const schemas: SchemaObject[] = [person, legalService, ...serviceSchemas, webSite, webPage, breadcrumbList];

  if (pageKey === 'faq') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
};

export const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const pageKey: PageKey =
      location.pathname === '/servicios-abogacia-mendoza'
        ? 'services'
        : location.pathname === '/experiencia'
          ? 'experience'
          : location.pathname === '/nuestro-metodo'
            ? 'method'
          : location.pathname === '/preguntas-frecuentes'
            ? 'faq'
            : location.pathname === '/contacto'
              ? 'contact'
              : 'home';

    const canonicalUrl = `${SITE_ORIGIN}${toCanonicalPath(pageKey, stripTrailingSlash(location.pathname))}`;
    const meta = PAGE_META[pageKey];

    document.title = meta.title;

    [
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: SITE_NAME },
      { name: 'publisher', content: 'Estudio Jurídico Dra. Emilia Sandobar' },
      { name: 'application-name', content: SITE_NAME },
      { name: 'apple-mobile-web-app-title', content: SITE_NAME },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: DEFAULT_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${SITE_NAME} — Abogada penalista en Mendoza` },
      { property: 'og:locale', content: 'es_AR' },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image', content: DEFAULT_IMAGE },
      { name: 'twitter:url', content: canonicalUrl },
      { name: 'twitter:image:alt', content: `${SITE_NAME} — Abogada penalista en Mendoza` },
    ].forEach(updateMeta);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', canonicalUrl);

    const previousSchemas = Array.from(
      document.head.querySelectorAll('script[data-seo-manager="true"]'),
    );
    previousSchemas.forEach((node) => node.remove());

    buildSchemas(pageKey, canonicalUrl).forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-manager', 'true');
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [location.hash, location.pathname]);

  return null;
};
