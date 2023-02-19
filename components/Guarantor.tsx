import { duration } from '@mui/material';
import React from 'react'

export interface Props {
  guarantorFullName: string
  guarantorPhone: string
  guarantorEmail: string
  guarantorRelationship: string
}

function Guarantor({ guarantorEmail, guarantorFullName, guarantorRelationship, guarantorPhone }: Props) {
  return (
    <div className='personal-info'>
      <h3 className='text-base font-medium'>Guarantor</h3>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-8 my-8'>
        <div>
          <p className='uppercase text-xs font-normal break-all'>full Name</p>
          <p className='font-medium text-base mt-2'>{guarantorFullName}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Phone Number</p>
          <p className='font-medium text-base mt-2'>{guarantorPhone}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Email Address</p>
          <p className='font-medium text-base mt-2 break-all lowercase'>{guarantorEmail}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Relationship</p>
          <p className='font-medium text-base mt-2 capitalize'>{guarantorRelationship}</p>
        </div>
      </div>
    </div>
  )
}

export default Guarantor