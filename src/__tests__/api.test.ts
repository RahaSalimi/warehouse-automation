import { GeneratePackingList } from '@/app/generatePackinglist';
import { GeneratePickingList } from '@/app/generatePickingList';

const mockOrders = [
  {
    order_id: 5,
    order_total: 1200,
    order_date: '2024-08-01',
    shipping_address: '100 York Street East',
    customer_name: 'Kevin Smith',
    customer_email: 'kevin.smith@example.com',
    line_items: [
      { line_item_id: 1, product_id: 2, product_name: 'Birthday Box', price: 200 },
      { line_item_id: 2, product_id: 1, product_name: 'Valentines Box', price: 300 },
      { line_item_id: 3, product_id: 3, product_name: 'Client Gift Box', price: 700 },
    ],
  },
  {
    order_id: 6,
    order_total: 1200,
    order_date: '2024-08-01',
    shipping_address: '100 Metcalfe Street East',
    customer_name: 'Shelly Smith',
    customer_email: 'shelly.smith@example.com',
    line_items: [
      { line_item_id: 1, product_id: 2, product_name: 'Birthday Box', price: 200 },
      { line_item_id: 2, product_id: 3, product_name: 'Client Gift Box', price: 700 },
    ],
  },
  {
    order_id: 7,
    order_total: 1200,
    order_date: '2024-08-01',
    shipping_address: '100 Spark Street East',
    customer_name: 'Avery Smith',
    customer_email: 'avery.smith@example.com',
    line_items: [
      { line_item_id: 1, product_id: 2, product_name: 'Birthday Box', price: 200 },
      { line_item_id: 2, product_id: 1, product_name: 'Valentines Box', price: 300 },
    ],
  },
];

const mockProducts = [
  { id: 1, name: 'Valentines Box', description: '', category: '', total_price: 300 },
  { id: 2, name: 'Birthday Box', description: '', category: '', total_price: 500 },
  { id: 3, name: 'Client Gift Box', description: '', category: '', total_price: 700 },
];

const mockLineItems = [
  { id: 1, name: 'Red Roses Bouquet', description: 'A bouquet of red roses', price: 20, total_stock: 50 },
  { id: 2, name: 'Box of chocolates', description: 'A box of chocolates', price: 10, total_stock: 100 },
  { id: 3, name: 'Love card', description: 'A love card', price: 5, total_stock: 100 },
  { id: 4, name: 'Women’s perfume', description: 'A bottle of perfume', price: 20, total_stock: 50 },
  { id: 5, name: 'Birthday cupcake', description: 'A cupcake', price: 5, total_stock: 200 },
  { id: 6, name: '$100 Visa Gift Card', description: 'A gift card', price: 100, total_stock: 100 },
  { id: 7, name: 'Birthday card', description: 'A birthday card', price: 5, total_stock: 100 },
  { id: 8, name: 'Fruit basket', description: 'A basket of fruit', price: 10, total_stock: 100 },
  { id: 9, name: 'Pen', description: 'A pen', price: 5, total_stock: 100 },
  { id: 10, name: 'Bottle of wine', description: 'A bottle of wine', price: 15, total_stock: 50 },
];

const mockProductItems = [
  { id: 1, product_id: 1, line_item_id: 1, quantity: 1 },
  { id: 2, product_id: 1, line_item_id: 2, quantity: 1 },
  { id: 3, product_id: 1, line_item_id: 3, quantity: 1 },
  { id: 4, product_id: 1, line_item_id: 4, quantity: 1 },
  { id: 5, product_id: 2, line_item_id: 5, quantity: 1 },
  { id: 6, product_id: 2, line_item_id: 6, quantity: 1 },
  { id: 7, product_id: 2, line_item_id: 7, quantity: 1 },
  { id: 8, product_id: 3, line_item_id: 8, quantity: 1 },
  { id: 9, product_id: 3, line_item_id: 9, quantity: 1 },
  { id: 10, product_id: 3, line_item_id: 10, quantity: 1 },
];

describe('Generate Packing and Picking List Tests', () => {
  it('should generate the correct packing list', async () => {
    const packingList = await GeneratePackingList(mockOrders, mockProducts, mockProductItems, mockLineItems);

    const expectedPackingList = [
      {
        "Order": 5,
        "Order Date": "August 1st, 2024",
        "Line Items": [
          "1. Birthday Box    a. Birthday cupcake x  1,b. $100 Visa Gift Card x  1,c. Birthday card x  1",
          "2. Valentines Box    a. Red Roses Bouquet x  1,b. Box of chocolates x  1,c. Love card x  1,d. Women’s perfume x  1",
          "3. Client Gift Box    a. Fruit basket x  1,b. Pen x  1,c. Bottle of wine x  1"
        ],
        "Ships To ": "1. Kevin Smith\r\n2.  100 York Street East"
      },
      {
        "Order": 6,
        "Order Date": "August 1st, 2024",
        "Line Items": [
          "1. Birthday Box    a. Birthday cupcake x  1,b. $100 Visa Gift Card x  1,c. Birthday card x  1",
          "2. Client Gift Box    a. Fruit basket x  1,b. Pen x  1,c. Bottle of wine x  1"
        ],
        "Ships To ": "1. Shelly Smith\r\n2.  100 Metcalfe Street East"
      },
      {
        "Order": 7,
        "Order Date": "August 1st, 2024",
        "Line Items": [
          "1. Birthday Box    a. Birthday cupcake x  1,b. $100 Visa Gift Card x  1,c. Birthday card x  1",
          "2. Valentines Box    a. Red Roses Bouquet x  1,b. Box of chocolates x  1,c. Love card x  1,d. Women’s perfume x  1"
        ],
        "Ships To ": "1. Avery Smith\r\n2.  100 Spark Street East"
      }
    ];

    expect(packingList).toEqual(expectedPackingList);
  });

  it('should generate the correct picking list', async () => {
    const pickingList = await GeneratePickingList(mockOrders, mockProducts, mockProductItems, mockLineItems);
    const expectedPickingList =[
      "Birthday cupcake x 3",
      "$100 Visa Gift Card x 3",
      "Birthday card x 3",
      "Red Roses Bouquet x 2",
      "Box of chocolates x 2",
      "Love card x 2",
      "Women’s perfume x 2",
      "Fruit basket x 2",
      "Pen x 2",
      "Bottle of wine x 2"];

    expect(pickingList).toEqual(expectedPickingList);
  });
});
