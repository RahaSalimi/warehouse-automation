
import { format, toZonedTime } from 'date-fns-tz';

type Order = {
    order_id: number;
    order_total: number;
    order_date: string;
    shipping_address: string;
    customer_name: string;
    customer_email: string;
    line_items: { line_item_id: number; product_id: number; product_name: string; price: number }[];
  }
  type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    total_price: number;
  }
  type ProductItem = {
    id: number;
    product_id: number;
    line_item_id: number;
    quantity: number;
  }
   type LineItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    total_stock: number;
   }

const getYesterdayOrders = (orders: Order[]) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0];

    return orders.filter(order => order.order_date === formattedDate);
    
};
const convertDate = (dateStr:string) => {
    const timeZone = 'UTC'; 
    const date = new Date(dateStr);
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, "MMMM do, yyyy");
  };

export  async function GeneratePackingList (orders:Order[],products:Product[],productItems:ProductItem[],lineItems:LineItem[])  {
    const ordersToProcess = getYesterdayOrders(orders);
    var packing:any = {};
    if (ordersToProcess.length > 0){
        packing = ordersToProcess.map(order => {
        const items = order.line_items.map((item:any,orderIndex:number) => {
          const product = products.find((p:any) => p.id === item.product_id);
          if (!product) {
            return null; 
          }
          const productItemsList = productItems.filter((pi:any) => pi.product_id === product.id);
  
      
          const lineItemsDetails = productItemsList.map((pi:any, i:number) => {
            const lineItem = lineItems.find((li:any) => li.id === pi.line_item_id);
            if (!lineItem) {
              return null; 
            }
            return `${String.fromCharCode(97 + (i+1) - 1)}. ${lineItem.name} x  ${pi.quantity}`;
          });
  
          return `${orderIndex + 1}. ${item.product_name}` + "    " +   `${lineItemsDetails}`
          
        });
  
        return {
          "Order": order.order_id,
          "Order Date": convertDate(order.order_date),
          "Line Items": items,
          "Ships To ":  "1. " + order.customer_name + "\r\n" + "2.  " + order.shipping_address 
        };
      });
    }
    return packing;
} 