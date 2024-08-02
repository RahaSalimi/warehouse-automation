import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { getCache, setCache } from '../../../lib/cache';
import path from 'path';


export async function GET(req: NextRequest, res:NextResponse ) {

  const cacheKey = `api/products`;
  const cached = getCache(cacheKey);
  if (cached) return NextResponse.json(cached);
  
  const jsonDirectory = await fs.readFile(path.resolve('src/app/data/products.json') , 'utf8');
  const products = JSON.parse(jsonDirectory);
  setCache(cacheKey, products);
  return NextResponse.json(products);
}
