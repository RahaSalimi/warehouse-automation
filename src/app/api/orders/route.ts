import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/mongodb';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { getCache, setCache } from '../../../lib/cache';
import path from 'path';


export async function GET(req: NextRequest, res:NextResponse ) {

  const cacheKey = `api/orders`;
  const cached = getCache(cacheKey);
  if (cached) return NextResponse.json(cached);
  
  const jsonDirectory = await fs.readFile(path.resolve('src/app/data/orders.json') , 'utf8');
  const orders = JSON.parse(jsonDirectory);
  setCache(cacheKey, orders);
  return NextResponse.json(orders);
}


// export default async function handler(req: NextApiRequest, res:NextApiResponse ) {
//     try {
//         const db = client.db();

//         const orders = await db.collection('orders').find({}).toArray();

//         res.status(200).json({ orders });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }