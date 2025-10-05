import { createClient } from 'redis';

const SHORT_CACHE_TTL = 60 * 5; // 5 minutes
const LONG_CACHE_TTL = 60 * 60 * 2; // 2 hours

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type: queryType } = req.query;

  if (!queryType || Array.isArray(queryType)) {
    return res.status(400).json({ error: 'A single "type" parameter is required.' });
  }

  const type = queryType;

  const client = createClient({
    url: process.env.REDIS_URL,
  });

  await client.connect();

  try {
    const cachedData = await client.get(type);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const apiUrl = getApiUrl(type);
    if (!apiUrl) {
      return res.status(400).json({ error: 'Invalid data type' });
    }

    const response = await fetch(apiUrl);
    const freshData = await response.json();

    let ttl = SHORT_CACHE_TTL;
    if (
      type === 'football:table' ||
      type === 'table_tennis:boys' ||
      type === 'table_tennis:girls' ||
      type === 'futsal:table'
    ) {
      ttl = LONG_CACHE_TTL;
    }

    await client.set(type, JSON.stringify(freshData), {
      EX: ttl,
    });

    return res.status(200).json(freshData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.quit();
  }
}

function getApiUrl(type: string): string | null {
  switch (type) {
    case 'football:table':
      return process.env.VITE_FOOTBALL_API ?? null;
    case 'table_tennis:boys':
      return process.env.VITE_TT_BOYS_API ?? null;
    case 'table_tennis:girls':
      return process.env.VITE_TT_GIRLS_API ?? null;
    case 'table_tennis:boys_final_stages':
      return process.env.VITE_TT_BOYS_FINAL_API ?? null;
    case 'table_tennis:girls_final_stages':
      return process.env.VITE_TT_GIRLS_FINAL_API ?? null;
    case 'futsal:table':
      return process.env.VITE_FUTSAL_API ?? null;
    case 'futsal:final_stages':
      return process.env.VITE_FUTSAL_FINAL_API ?? null;
    case 'football:final_stages':
      return process.env.VITE_FOOTBALL_FINAL_API ?? null;
    default:
      return null;
  }
}
