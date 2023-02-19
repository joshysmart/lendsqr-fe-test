/* eslint-disable @next/next/no-img-element */
import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import styles from "../styles/User.module.css"

// create inerface for user profile
interface UserProfile {
  loanRepayment: number;
  accountBalance: string;
  userBank: string;
  avatar: string;
  accountNumber: string;
  bvn: string;
  fullname: string;
}

function UserProfile({ loanRepayment, accountBalance, userBank, avatar, accountNumber, bvn, fullname }: UserProfile) {
  const tier = loanRepayment < 200 ? 3 : loanRepayment < 500 ? 2 : 1
  console.log(avatar)
  return (
    <div className="user-profile bg-white shadow-[3px__0__20px__#0000000a] px-8 pt-8 mt-10 mb-8">
      <div className='flex flex-col lg:flex-row items-center gap-8 pb-12'>
        <div>
          <div className="avartar">
            <img src={avatar}
              alt="avatar"
              height={100}
              width={100}
              className="rounded-full"
            />
          </div>
        </div>
        <div className=''>
          <p className='text-2xl font-medium'>{fullname}</p>
          <p className='text-sm'>{accountNumber}</p>
        </div>
        <div className='seperator w-[1px] h-[80px] bg-[#545F7D]  hidden lg:block'></div>
        <div className='text-sm font-medium'>
          <p>User’s Tier</p>
          <Rating name="read-only" value={tier} readOnly max={3} />
        </div>
        <div className='seperator w-[1px] h-[80px] bg-[#545F7D] hidden lg:block'></div>
        <div>
          <p>{accountBalance}</p>
          <p className='capitalize text-xs font-normal'>{bvn} / <span className='capitalize'>{userBank}</span></p>
        </div>
      </div>
      <div className='hidden lg:block'>
        <ul className='flex items-center justify-around'>
          <li className={`${styles.active} pb-3 cursor-pointer hover:border-b-2 border-[#39CDCC] transition-all px-4`}>General Details</li>
          <li className='pb-3 cursor-pointer hover:border-b-2 border-[#39CDCC] transition-all px-4'>Documents</li>
          <li className='pb-3 cursor-pointer hover:border-b-2 border-[#39CDCC] transition-all px-4'>Bank Details</li>
          <li className='pb-3 cursor-pointer hover:border-b-2 border-[#39CDCC] transition-all px-4'>Loans</li>
          <li className='pb-3 cursor-pointer hover:border-b-2 border-[#39CDCC] transition-all px-4'>Loans</li>
          <li className='pb-3 cursor-pointer hover:border-b-2 border-[#39CDCC] transition-all px-4'>Savings</li>
          <li className='pb-3 cursor-pointer hover:border-b-2 border-[#39CDCC] transition-all px-4'>App and System</li>
        </ul>
      </div>
    </div>
  )
}

export default UserProfile