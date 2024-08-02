'use client'
import React from 'react';
import PageContainer from '@/app/(DashboardLayout)/layout/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/layout/card/DashboardCard';




const Dashboard: React.FC = () => {



  return (
    <PageContainer title="Dashboard" >
      <DashboardCard title="Dashboard">
      
      </DashboardCard>
    </PageContainer>

      
  );
};

export default Dashboard;