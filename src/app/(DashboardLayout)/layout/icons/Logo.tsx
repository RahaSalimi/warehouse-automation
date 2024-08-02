'use client';
import PageContainer from '@/app/(DashboardLayout)/layout/container/PageContainer';
import Image from 'next/image'


const Logo = () => {
  return (
    <PageContainer title="Icons" description="this is Icons">

      <Image src="/static/images/logo.png"  title="cozey"  alt='cozey'  width="100" height="50"/>
     
    </PageContainer>
  );
};

export default Logo;