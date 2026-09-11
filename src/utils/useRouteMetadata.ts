import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateStructuredData } from './structuredData';

const SITE_URL = 'https://abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-home.webp`;

interface RouteMetadata {
  title: string;
  description: string;
}

const ROUTE_METADATA: Record<string, RouteMetadata> = {
  '/': {
    title: 'Emilia Sandobar | Abogada Penalista en Mendoza',
    description:
      'Emilia Sandobar es abogada penalista en Mendoza. Brinda asesoramiento, defensa y representación jurídica en asuntos penales y vinculados con personas y organizaciones.',
  },
  '/inicio': {
    title: 'Emilia Sandobar | Abogada Penalista en Mendoza',
    description:
      'Emilia Sandobar es abogada penalista en Mendoza. Brinda asesoramiento, defensa y representación jurídica en asuntos penales y vinculados con personas y organizaciones.',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Abogacía en Mendoza | Emilia Sandobar',
    description:
      'Servicios de abogacía en Mendoza de Emilia Sandobar: defensa penal, litigación y asesoramiento jurídico para personas, empresas y organizaciones.',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Emilia Sandobar',
    description:
      'Emilia Sandobar es abogada penalista en Mendoza. Esta página reúne información sobre su perfil profesional y su actividad de asesoramiento y litigación penal.',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Emilia Sandobar, Abogada Penalista',
    description:
      'Conozca el método de trabajo de Emilia Sandobar para analizar cada situación jurídica, definir una estrategia y acompañar una consulta profesional.',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Abogada Penalista en Mendoza',
    description:
      'Preguntas frecuentes sobre la atención profesional de Emilia Sandobar, abogada penalista en Mendoza, y sobre cómo orientar una primera consulta jurídica.',
  },
  '/contacto': {
    title: 'Contacto | Emilia Sandobar, Abogada Penalista en Mendoza',
    description:
      'Contacto de Emilia Sandobar, abogada penalista en Mendoza, para solicitar una consulta y recibir orientación sobre una situación jurídica.',
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
    const metadata = ROUTE_METADATA[pathname] ?? ROUTE_METADATA['/'];
    const canonicalPath = pathname === '/inicio' ? '/' : pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    document.title = metadata.title;

    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'es_AR');
    upsertMeta('property', 'og:site_name', 'Emilia Sandobar');
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', DEFAULT_IMAGE);
    upsertMeta('property', 'og:image:alt', 'Emilia Sandobar — Abogada Penalista en Mendoza');
    upsertMeta('property', 'og:image:type', 'image/webp');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE);
    upsertMeta('name', 'twitter:image:alt', 'Emilia Sandobar — Abogada Penalista en Mendoza');
    upsertMeta('name', 'twitter:url', canonicalUrl);

    upsertCanonical(canonicalUrl);
    updateStructuredData({ path: canonicalPath, ...metadata });
  }, [pathname]);
}
