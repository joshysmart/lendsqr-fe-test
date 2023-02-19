import DashboardLayout from '@/components/DashboardLayout'
import React from 'react'
import dynamic from 'next/dynamic';

const Users = dynamic(() => import("@/components/Users"), { ssr: false })

function users(): JSX.Element {
  return (
    <DashboardLayout>
      <Users />
    </DashboardLayout>
  );
}

export default users