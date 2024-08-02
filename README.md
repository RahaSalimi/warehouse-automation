This is a [Next.js] project.

## Getting Started

First, install all the dependencies using npm install and then  run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Here is the process and project brief ###

## 1. Problem to solve ##
Need to automate the warehouse team tasks for picking and packing the orders.
Picking List: A consolidated list of individual products needed for all orders from the previous day.
Packing List: Detailed information for each order, including customer details, order date, and the breakdown of each gift box into 

## 2. Data Structure Design ##
`Orders `: Includes order details, customer information, and line items.
`Products`: Information about each product.
`Line Items`: The individual items that make up each product.
`Product Items`: Mapping between products and their constituent line items.

## 3. The Mock Json files ## 
path =>  src/app/data
orders.json
products.json
lineitems.json
productitems.json


## 4. API Routes ##
 1. /api/packinglist 
 2. /api/pickinglist

## 5. Assumptions ##
1. I assumed that the data format in the JSON files would remain consistent and correct.
2. The data was assumed to be static for the purpose of this test, without any concurrent modifications.
3. Single-Day Processing: The solution is designed to process orders from the previous day only.

## 6. Limitations ##
`Scalability`: The current implementation reads data from JSON files, which is not scalable for large datasets or high-frequency requests.
`Error Handling`: Basic error handling is in place, but it could be more robust, especially for file read operations and data validation.
`Performance`: Performance optimization for large datasets has not been addressed in this solution.


## 7. Enhancements ##
`Database Integration`: Integrate a database to handle larger datasets efficiently and allow for dynamic data modifications.
`Real-Time Processing`: Implement real-time order processing and list generation to handle orders as they come in.
`Improved UI`: Enhance the user interface to provide a more user-friendly experience for warehouse staff.
`Detailed Error Handling`: Add more comprehensive error handling and logging to ensure reliability and easier debugging.







