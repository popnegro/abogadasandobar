import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateStructuredData } from './structuredData';

const SITE_URL = 'https://abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-home.webp`;

interface RouteMetadata {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

/** Keep in sync with scripts/generate-route-html.mjs */
const ROUTE_METADATA: Record<string, RouteMetadata> = {
  '/': {
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza',
  },
  '/inicio': {
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Abogacía en Mendoza | Defensa Penal y Urgencias 24 hs',
    description:
      'Abogada penal en Mendoza: defensa penal, urgencias 24 hs, litigación compleja y asesoramiento corporativo especializado.',
    image: `${SITE_URL}/assets/images/hero/hero-services.webp`,
    imageAlt: 'Servicios de abogacía penal en Mendoza — Emilia Sandobar',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Especializada en Derecho Penal | Emilia Sandobar',
    description:
      'Emilia Sandobar, abogada penalista en Mendoza especializada en derecho penal. Litigio provincial y federal, con guardia legal 24 hs.',
    image: `${SITE_URL}/assets/images/hero/hero-about.webp`,
    imageAlt: 'Perfil de Emilia Sandobar, abogada penalista en Mendoza',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Abogada Penalista en Mendoza | Emilia Sandobar',
    description:
      'Método de trabajo de la abogada penalista Emilia Sandobar: análisis, estrategia y acompañamiento en causas penales en Mendoza.',
    image: `${SITE_URL}/assets/images/hero/hero-method.webp`,
    imageAlt: 'Método de trabajo — abogada penalista Emilia Sandobar',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Abogada Penalista 24 hs en Mendoza',
    description:
      'FAQ abogada penalista en Mendoza: contactar guardia 24 hs, qué hacer si me detienen, y diferencia entre abogada penal y penalista.',
    image: `${SITE_URL}/assets/images/hero/hero-faq.webp`,
    imageAlt: 'Preguntas frecuentes — abogada penalista en Mendoza',
  },
  '/contacto': {
    title: 'Contacto | Abogada Penalista en Mendoza | Guardia Legal 24 hs',
    description:
      'Contacte a Emilia Sandobar, abogada penalista en Mendoza. Consulta profesional y guardia legal 24 hs para urgencias penales.',
    image: `${SITE_URL}/assets/images/hero/hero-contact.webp`,
    imageAlt: 'Contacto y guardia legal 24 hs — Emilia Sandobar',
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
    const image = metadata.image ?? DEFAULT_IMAGE;
    const imageAlt = metadata.imageAlt ?? 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza';

    document.title = metadata.title;

    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'es_AR');
    upsertMeta('property', 'og:site_name', 'Emilia Sandobar');
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('property', 'og:image:width', '1376');
    upsertMeta('property', 'og:image:height', '768');
    upsertMeta('property', 'og:image:type', 'image/webp');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', image);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
    upsertMeta('name', 'twitter:url', canonicalUrl);

    upsertCanonical(canonicalUrl);
    updateStructuredData({ path: canonicalPath, ...metadata });
  }, [pathname]);
}
