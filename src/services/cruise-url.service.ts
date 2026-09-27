export function buildCruiseLandingPath(slug = 'c-1-carnival'): string {
  const normalized = slug.startsWith('/') ? slug.slice(1) : slug;
  return `/${normalized}`;
}

export function buildCruiseLandingUrl(baseUrl: string, slug = 'c-1-carnival'): string {
  return new URL(buildCruiseLandingPath(slug), baseUrl).toString();
}
