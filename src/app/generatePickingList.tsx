
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
const getYesterdayOrders = (orders: any[]) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0];

    return orders.filter(order => order.order_date === formattedDate);
};

export async  function GeneratePickingList (orders: Order[], products: Product[], productItems: ProductItem[], lineItems: LineItem[])  {
    const ordersToProcess = getYesterdayOrders(orders);
    const picking: any = {};
    if (ordersToProcess.length > 0) {
        ordersToProcess.forEach(order => {
            order.line_items.forEach((item: any, index: number) => {
                const product = products.find((p: any) => p.id === item.product_id);
                if (!product) {
                    return null; 
                  }
                const productItemsList = productItems.filter((pi: any) => pi.product_id === product.id);

                productItemsList.forEach((pi: any, i: number) => {
                    const lineItem = lineItems.find((li: any) => li.id === pi.line_item_id);
                    if (!lineItem) {
                        return null; 
                      }
                    if (picking[lineItem.name]) {
                        picking[lineItem.name] += pi.quantity;
                    } else {
                        picking[lineItem.name] = pi.quantity;
                    }
                });
            });
        });
    }

    var pickingList = (Object.entries(picking).map(([name, quantity]) => `${name}` + " x " +`${quantity}` ));
    return pickingList;
 }