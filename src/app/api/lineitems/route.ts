import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { getCache, setCache } from '../../../lib/cache';
import path from 'path';


export async function GET(req: NextRequest, res:NextResponse ) {

  const cacheKey = `api/lineItems`;
  const cached = getCache(cacheKey);
  if (cached) return NextResponse.json(cached);
  
  const jsonDirectory = await fs.readFile(path.resolve('src/app/data/line_items.json') , 'utf8');
  const lineItems = JSON.parse(jsonDirectory);
  setCache(cacheKey, lineItems);
  return NextResponse.json(lineItems);
}