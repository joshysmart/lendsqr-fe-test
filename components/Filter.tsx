import React from 'react'

function Filter({ showFilter }: any) {
  return (
    <div className={`absolute top-0 left-8 bg-white shadow-[3px__5px__20px__#0000000a] py-8 px-5 ${!showFilter && "hidden"} flex flex-col gap-4`}>
      <div>
        <p className="text-sm font-medium">Organization</p>
        <select name="org" id="org" className='w-full  py-2 bg-white mt-2 border border-[##213F7D] px-5'>
          <option value="select" className='hidden' hidden>Select</option>
        </select>
      </div>
      <div>
        <p className="text-sm font-medium">Username</p>
        <input type="text" placeholder="User" className=' py-2 bg-white mt-2 border border-[##213F7D] px-5' />
      </div>
      <div>
        <p className="text-sm font-medium">Email</p>
        <input type="email" placeholder="Email" className=' py-2 bg-white mt-2 border border-[##213F7D] px-5' />
      </div>
      <div>
        <p className="text-sm font-medium">Date</p>
        <input type="date" className=' py-2 w-full bg-white mt-2 border border-[##213F7D] px-5' />
      </div>
      <div>
        <p className="text-sm font-medium">Phone Number</p>
        <input type="text" placeholder="Phone Number" className=' py-2 bg-white mt-2 border border-[##213F7D] px-5' />
      </div>
      <div>
        <p className="text-sm font-medium">Status</p>
        <select name="status" id="status" className='w-full py-2 bg-white mt-2 border border-[##213F7D] px-5'>
          <option value="select" className='hidden' hidden>Select</option>
        </select>
      </div>
      <div>
        <button>Reset</button>
        <button>Filter</button>
      </div>
    </div>)
}

export default Filter