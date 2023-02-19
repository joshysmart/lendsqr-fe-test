import { duration } from '@mui/material';
import React from 'react'

export interface Props {
  loe: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  employmentDuration: string;
  officeEmail: string
  userIncomeFrom: string
  userIncomeTo: string
  loanRepayment: number
}

function Education({ loe, employmentStatus, sectorOfEmployment, employmentDuration, officeEmail, userIncomeFrom, userIncomeTo, loanRepayment }: Props) {
  return (
    <div className='personal-info'>
      <h3 className='text-base font-medium'>Education and Employment</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 my-8">
        <div className=''>
          <p className='uppercase text-xs font-normal'>level of education</p>
          <p className='font-medium text-base mt-2'>{loe}</p>
        </div>
        <div className=''>
          <p className='uppercase text-xs font-normal'>employment status</p>
          <p className='font-medium text-base mt-2'>{employmentStatus}</p>
        </div>
        <div className=''>
          <p className='uppercase text-xs font-normal'>sector of employment</p>
          <p className='font-medium text-base break-all mt-2'>{sectorOfEmployment}</p>
        </div>
        <div className=''>
          <p className='uppercase text-xs font-normal '>Duration of employment</p>
          <p className='font-medium text-base mt-2'>{employmentDuration}</p>
        </div>

      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4  gap-y-8 my-8'>
        <div>
          <p className='uppercase text-xs font-normal'>office email</p>
          <p className='font-medium text-base mt-2 break-all'>{officeEmail}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Monthly income</p>
          <p className='font-medium text-base mt-2'>&#x20A6;{userIncomeFrom} - &#x20A6;{userIncomeTo}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>loan repayment</p>
          <p className='font-medium text-base mt-2'>{loanRepayment}</p>
        </div>
      </div>
    </div>
  )
}

export default Education