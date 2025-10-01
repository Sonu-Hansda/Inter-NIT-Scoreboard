import { kv } from '@vercel/kv';

const CACHE_TTL = 60 * 5; // 5 minutes

export async function fetchAndCache<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cachedData = await kv.get<T>(key);

  if (cachedData) {
    return cachedData;
  }

  const freshData = await fetcher();
  await kv.set(key, freshData, { ex: CACHE_TTL });

  return freshData;
}
