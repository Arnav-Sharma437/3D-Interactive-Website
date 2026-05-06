/** Next/Image: allow admin uploads (data URLs) and arbitrary hosts via unoptimized. */
export function imageUnoptimized(src: string) {
  return src.startsWith('data:') || !src.startsWith('https://images.unsplash.com/');
}

export function isDataUrl(src: string) {
  return src.startsWith('data:');
}
