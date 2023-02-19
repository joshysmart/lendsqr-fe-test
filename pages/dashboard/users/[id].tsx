import DashboardLayout from '@/components/DashboardLayout'
import React from 'react'
import dynamic from 'next/dynamic'

const User = dynamic(() => import('@/components/User'), { ssr: false })

const user = () => {
  return (
    <DashboardLayout>
      <User />
    </DashboardLayout>
  )
}

export default user