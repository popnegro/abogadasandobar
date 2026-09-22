import { readFile, writeFile } from 'node:fs/promises';

const SITE_URL = 'https://abogadasandobar.com.ar';

const ROUTE_HEROES = {
  '/abogada-penalista-mendoza/': `${SITE_URL}/assets/images/hero/hero-about.webp`,
  '/servicios-abogacia-mendoza/': `${SITE_URL}/assets/images/hero/hero-services.webp`,
};

for (const [route, heroUrl] of Object.entries(ROUTE_HEROES)) {
  const filePath = `dist${route}index.html`;
  let html = await readFile(filePath, 'utf8');

  if (!html.includes(`href="${heroUrl}"`)) {
    html = html.replace(
      '</head>',
      `  <link rel="preload" as="image" href="${heroUrl}" fetchpriority="high" />\n</head>`,
    );
  }

  await writeFile(filePath, html);
}

console.log('Route hero images preloaded for priority public routes.');
