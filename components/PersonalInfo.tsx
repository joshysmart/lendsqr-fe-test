import React from 'react'

export interface Props {
  fullName: string;
  phoneNumber: string;
  email: string;
  bvn: string;
  gender: string
  maritalStatus: string
  typeOfResidence: string
  userChildren: string
}

function PersonalInfo({ fullName, phoneNumber, email, bvn, gender, maritalStatus, userChildren, typeOfResidence }: Props) {
  return (
    <div className='personal-info'>
      <h3 className='text-base font-medium'>Personal Information</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-8 my-8">
        <div className=''>
          <p className='uppercase text-xs font-normal'>Full Name</p>
          <p className='font-medium text-base mt-2'>{fullName}</p>
        </div>
        <div className=''>
          <p className='uppercase text-xs font-normal'>Phone Number</p>
          <p className='font-medium text-base mt-2'>{phoneNumber}</p>
        </div>
        <div className=''>
          <p className='uppercase text-xs font-normal'>Email Address</p>
          <p className='font-medium text-base break-all lowercase mt-2'>{email}</p>
        </div>
        <div className=''>
          <p className='uppercase text-xs font-normal '>Bvn</p>
          <p className='font-medium text-base mt-2'>{bvn}</p>
        </div>
        <div className=''>
          <p className='uppercase text-xs font-normal'>Gender</p>
          <p className='font-medium text-base mt-2'>{gender}</p>
        </div>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-y-8 my-8'>
        <div>
          <p className='uppercase text-xs font-normal'>Marital status</p>
          <p className='capitalize font-medium text-base mt-2'>{maritalStatus}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Children</p>
          <p className='capitalize font-medium text-base mt-2'>{userChildren}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Type of residence</p>
          <p className='capitalize font-medium text-base mt-2'>{typeOfResidence}</p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo