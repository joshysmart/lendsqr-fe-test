import { db } from '@/db/db.config';
import { useLiveQuery } from 'dexie-react-hooks';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter()
  const admin = useLiveQuery(() => db.admin.toArray(), []);

  console.log(admin)
  useEffect(() => {
    if (admin) {
      router.push("/dashboard/users")
    }
  })

  async function addUser(e: any) {
    try {
      // Add the new user!
      const id = await db.admin.add({
        email,
        password
      });

      setStatus(`User ${email} successfully added. Got id ${id}`);
      router.push("/")
    } catch (error) {
      setStatus(`Failed to add user: ${error}`);
    }
  }

  return (
    <div className='wrapper w-full flex flex-col lg:flex-row'>
      <div className="left lg:w-[51%] h-full xl:min-h-[900px] hidden lg:flex flex-col items-center justify-center relative">
        <div className='w-full px-24 absolute top-28'>
          <Image
            src="/assets/icons/header-logo.svg"
            alt="logo"
            width={160}
            height={40}
            className={"w-[160px] h-[40px]"}
          />
        </div>

        <Image
          src={"/assets/images/pablo-sign-in.svg"}
          alt="sign-in-illustration"
          width={600}
          height={340}
        />
      </div>
      <div className="right lg:w-[49%] h-full xl:min-h-[900px] flex justify-center bg-white">
        <div className='w-[85%] lg:w-[65%] pt-28 lg:pt-56'>
          <div className=''>
            <h1 className='text-[#213F7D] text-5xl font-bold leading-[4rem]'>Welcome!</h1>
            <p className='text-[#545F7D] text-xl'>Enter details to login.</p>
          </div>

          <div className='mt-16'>
            <div>
              <input type="email" placeholder='Email' className='w-full mb-6 bg-white border border-[545f7d26] p-4' onChange={e => setEmail(e.target.value)} required />
              <label htmlFor="password" className='relative'>
                <input type="password" placeholder='Password' className='w-full mb-6 bg-white border border-[545f7d26] p-4' onChange={e => setPassword(e.target.value)} required />
                <span className='absolute right-4 top-0 text-[#39CDCC] text-xs font-semibold uppercase cursor-pointer'>SHOW</span>
              </label>
            </div>
            <p className='text-xs text-[#39CDCC] font-semibold uppercase'>Forgot PASSWORD?</p>
            <button type="submit" className='uppercase bg-[#39CDCC] w-full mt-[30px] text-center py-4 text-white' onClick={addUser}>log in</button>
            <p></p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login