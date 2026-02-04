export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}


export function generateSku(productName: string, index: number) {
  const base = slugify(productName);
  const suffix = String(index + 1).padStart(3, '0');
  return `${base}-${suffix}`;
}