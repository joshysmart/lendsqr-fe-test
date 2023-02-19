import React from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/Login'), { ssr: false })

function login() {
  return (
    <Login />
  )
}

export default login