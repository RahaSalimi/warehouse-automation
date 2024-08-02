'use client'
import PageContainer from '@/app/(DashboardLayout)/layout/container/PageContainer';
import { Grid, Box } from '@mui/material';
import Orders from '@/app/(DashboardLayout)/pages/orders/page';

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
          <Orders />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
