'use client'
import React, { useEffect, useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/layout/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/layout/card/DashboardCard';
import {
  Box, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Parser } from 'json2csv';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [lineItems, setLineItems] = useState<any[]>([]);
  const [productItems, setProductItems] = useState<any[]>([]);
  const [pickingList, setPickingList] = useState<any[]>([]);
  const [packingList, setPackingList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ordersRes = await fetch('/api/orders');
      const productsRes = await fetch('/api/products');
      const lineItemsRes = await fetch('/api/lineitems');
      const productItemsRes = await fetch('/api/productitems');

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      const lineItemsData = await lineItemsRes.json();
      const productItemsData = await productItemsRes.json();

      setOrders(ordersData.sort((a: any, b: any) => b.order_date.localeCompare(a.order_date)));
      setProducts(productsData);
      setLineItems(lineItemsData);
      setProductItems(productItemsData);
    };

    fetchData();
  }, []);



  const  generatePickingList = async () => {
    const pickinglist = await fetch('/api/pickinglist');
    const pickinglistData = await pickinglist.json();
    
    if (pickinglistData.length>0) {
      setPickingList(pickinglistData);
      const transformedData = pickinglistData.map((item:string, index:number) => ({ Index: index, Item: item }));
      exportToFile(transformedData, 'picking_list.csv');
    } else {
      setPickingList([]);
      window.alert("No orders to process");
    }
  };

  const generatePackingList = async () => {
    const packinglist = await fetch('/api/packinglist');
    const packinglistData = await packinglist.json();
    if(packinglistData.length>0){

      setPackingList(packinglistData);
      exportToFile(packinglistData, 'packing_list.csv');

    } else {
      setPackingList([]);
      window.alert("No orders to process");
    }
  };

  const exportToFile = (data: any, filename: string) => {
    
    const parser = new Parser();
    const csv = parser.parse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };



  return (
    <PageContainer title="Orders" >
      <DashboardCard title="Orders">


        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, marginBottom: 3 }}>
            <Button variant="contained" color="primary" onClick={generatePickingList}>Generate Picking List</Button>
            <Button variant="contained" color="secondary" onClick={generatePackingList}>Generate Packing List</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="right">Total Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow key={order.order_id}>
                    <StyledTableCell component="th" scope="row">
                      {order.order_id}
                    </StyledTableCell >
                    <StyledTableCell >{order.order_date}</StyledTableCell >
                    <StyledTableCell >{order.customer_name}</StyledTableCell >
                    <StyledTableCell align="right">{order.order_total.toFixed(2)}</StyledTableCell >
                  </StyledTableRow >
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

      </DashboardCard>

    </PageContainer >



  );
};

export default Orders;
