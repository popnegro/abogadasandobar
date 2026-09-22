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
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta profesional y confidencial.',
  },
  '/inicio': {
    title: 'Abogada Penalista en Mendoza | Defensa Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista en Mendoza especializada en derecho penal. Defensa penal, representación de víctimas y guardia legal 24 hs. Consulta profesional y confidencial.',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Abogacía en Mendoza | Defensa Penal y Urgencias 24 hs',
    description:
      'Abogada penal en Mendoza: defensa penal integral, urgencias 24 hs, litigación compleja y asesoramiento corporativo. Servicios especializados en derecho penal.',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Especializada en Derecho Penal | Emilia Sandobar',
    description:
      'Emilia Sandobar, abogada penalista en Mendoza especializada en derecho penal. Trayectoria, litigio provincial y federal, y atención profesional con guardia 24 hs.',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Abogada Penalista en Mendoza | Emilia Sandobar',
    description:
      'Método de trabajo de la abogada penalista Emilia Sandobar: análisis, estrategia y acompañamiento profesional en causas penales en Mendoza.',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Abogada Penalista 24 hs en Mendoza',
    description:
      'FAQ de la abogada penalista en Mendoza: cómo contactar guardia 24 hs, qué hacer si me detienen, diferencia entre abogada penal y penalista, y más.',
  },
  '/contacto': {
    title: 'Contacto | Abogada Penalista en Mendoza | Guardia Legal 24 hs',
    description:
      'Contacte a Emilia Sandobar, abogada penalista en Mendoza. Consulta profesional y guardia legal 24 hs para urgencias penales.',
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
