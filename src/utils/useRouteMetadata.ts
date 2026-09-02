import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-office.webp`;

interface RouteMetadata {
  title: string;
  description: string;
}

const ROUTE_METADATA: Record<string, RouteMetadata> = {
  '/': {
    title: 'Dra. Emilia Sandobar | Abogada en Mendoza',
    description:
      'Dra. Emilia Sandobar, abogada en Mendoza. Asesoramiento y representación jurídica para particulares, empresas y directivos, con atención profesional y confidencial.',
  },
  '/inicio': {
    title: 'Dra. Emilia Sandobar | Abogada en Mendoza',
    description:
      'Dra. Emilia Sandobar, abogada en Mendoza. Asesoramiento y representación jurídica para particulares, empresas y directivos, con atención profesional y confidencial.',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Abogacía en Mendoza | Dra. Emilia Sandobar',
    description:
      'Servicios de abogacía en Mendoza: defensa penal, litigación compleja y asesoramiento corporativo para personas y organizaciones.',
  },
  '/experiencia': {
    title: 'Experiencia Profesional | Dra. Emilia Sandobar',
    description:
      'Experiencia profesional de la Dra. Emilia Sandobar en abogacía, litigación penal y asesoramiento jurídico.',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Dra. Emilia Sandobar',
    description:
      'Conozca el método de trabajo de la Dra. Emilia Sandobar para el análisis, estrategia y acompañamiento de cada situación jurídica.',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Abogada en Mendoza',
    description:
      'Preguntas frecuentes sobre consultas, servicios jurídicos y el proceso de atención de la Dra. Emilia Sandobar en Mendoza.',
  },
  '/contacto': {
    title: 'Contacto | Dra. Emilia Sandobar',
    description:
      'Contacto de la Dra. Emilia Sandobar para consultas jurídicas y asesoramiento profesional en Mendoza.',
  },
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

export function useRouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = ROUTE_METADATA[pathname] ?? ROUTE_METADATA['/inicio'];
    const canonicalPath = pathname === '/' ? '/inicio' : pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    document.title = metadata.title;

    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'es_AR');
    upsertMeta('property', 'og:site_name', 'Dra. Emilia Sandobar');
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', DEFAULT_IMAGE);
    upsertMeta('property', 'og:image:alt', 'Dra. Emilia Sandobar — Abogada en Mendoza');
    upsertMeta('property', 'og:image:type', 'image/webp');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE);
    upsertMeta('name', 'twitter:image:alt', 'Dra. Emilia Sandobar — Abogada en Mendoza');
    upsertMeta('name', 'twitter:url', canonicalUrl);

    upsertCanonical(canonicalUrl);
  }, [pathname]);
}
