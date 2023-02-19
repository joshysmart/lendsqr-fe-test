import { duration } from '@mui/material';
import React from 'react'

export interface Props {
  twitter: string
  facebook: string
  instagram: string
}

function Socials({ twitter, facebook, instagram }: Props) {
  return (
    <div className='personal-info'>
      <h3 className='text-base font-medium'>Socials</h3>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-8 my-8'>
        <div>
          <p className='uppercase text-xs font-normal break-all'>Twitter</p>
          <p className='font-medium text-base mt-2'>{twitter}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Facebook</p>
          <p className='font-medium text-base mt-2'>{facebook}</p>
        </div>
        <div>
          <p className='uppercase text-xs font-normal'>Instagram</p>
          <p className='font-medium text-base mt-2'>{instagram}</p>
        </div>
      </div>
    </div>
  )
}

export default Socials