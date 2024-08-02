import ProductItems from '@/models/product_items';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { format } from 'date-fns';
import { GeneratePackingList } from '@/app/generatePackinglist';



export async function GET(req: NextRequest,res:NextResponse) {
    
    const ordersDirectory = await fs.readFile(path.resolve('src/app/data/orders.json'), 'utf8');
    const productsDirectory = await fs.readFile(path.resolve('src/app/data/products.json'), 'utf8');
    const productItemsDirectory = await fs.readFile(path.resolve('src/app/data/product_items.json'), 'utf8');
    const lineItemsDirectory = await fs.readFile(path.resolve('src/app/data/line_items.json'), 'utf8');
    const orders = JSON.parse(ordersDirectory);
    const products = JSON.parse(productsDirectory);
    const productItems = JSON.parse(productItemsDirectory);
    const lineItems = JSON.parse(lineItemsDirectory);

    const packing= await GeneratePackingList(orders,products,productItems,lineItems);
    return NextResponse.json(packing);
}