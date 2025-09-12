#!/usr/bin/env node
/* global process */
import fs from 'fs';
import path from 'path';
import Products from '../src/data/products.js';

const siteUrl = process.env.SITE_URL || 'crwn3.vercel.app';
const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const urls = [
  '/',
  '/shop',
  '/about',
  '/contact',
  '/login',
  '/signup',
];

for (const p of Products) {
  const slug = p.slug || `product-${p.id}`;
  urls.push(`/product/${slug}`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${siteUrl.replace(/\/$/, '')}${u}</loc></url>`).join('\n')}\n</urlset>`;

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml written to public/sitemap.xml');
