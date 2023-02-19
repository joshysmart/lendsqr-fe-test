import { db } from '@/db/db.config';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Education from './Education';
import Guarantor from './Guarantor';
import PersonalInfo from './PersonalInfo';
import Socials from './Socials';
import UserProfile from './UserProfile';

const csv = (num: any) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function User() {
  // get id from params
  const router = useRouter()
  const { id }: any = router.query

  const user: any = useLiveQuery(() => db.users.get(id), []);
  const userProfile = user && user?.profile
  const firstName = userProfile?.firstName
  const lastName = userProfile?.lastName
  const fullName = `${firstName} ${lastName}`
  const phoneNumber = user?.phoneNumber.split("x")[0];
  const bvn = userProfile?.bvn;
  const gender = userProfile?.gender;
  const email = user?.email;
  const loanRepayment = parseFloat(user?.education.loanRepayment)
  const accountBalance = csv((user?.accountBalance * 750).toFixed(2))
  const userBank = user?.orgName.split("-")[0] + " bank"
  const avatar = userProfile?.avatar
  const officeEmail = user?.education.officeEmail
  const employmentStatus = user?.education.employmentStatus
  const employmentDuration = user?.education.duration
  const loe = user?.education.level
  const sectorOfEmployment = user?.education.sector
  const incomeFrom = user?.education.monthlyIncome[0]
  const incomeTo = user?.education.monthlyIncome[1]
  const userIncomeFrom = csv((incomeFrom * 750).toFixed(2))
  const userIncomeTo = csv((incomeTo * 750).toFixed(2))
  const twitter = user?.socials.twitter
  const facebook = user?.socials.facebook
  const instagram = user?.socials.instagram
  const guarantorFirstName = user?.guarantor.firstName
  const guarantorLasttName = user?.guarantor.lastName
  const guarantorFullName = `${guarantorFirstName} ${guarantorLasttName}`
  const guarantorPhone = user?.guarantor.phoneNumber.split("x")[0]


  const maritalStatusArr = ["signle", "married", "in a relationship"]
  const maritalStatus = maritalStatusArr[Math.floor(Math.random() * maritalStatusArr.length)]
  const childrenArr = ["One", "Two", "three", "four", "five", "six", "seven", "eight", "nine"]
  const userChildren = childrenArr[Math.floor(Math.random() * childrenArr.length)]
  const typeOfResidenceArr = ["parent's apartment", "self apartment", "squatting with a friend or relative"]
  const typeOfResidence = typeOfResidenceArr[Math.floor(Math.random() * typeOfResidenceArr.length)]

  return (
    <div className="w-full lg:w-[80%] px-5 py-8 lg:p-16">
      <Link href="/dashboard/users" className='flex items-center gap-4 font-normal text-base mb-8'>
        <FaArrowLeft /> <p>Back to users</p>
      </Link>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
        <h2 className="text-2xl font-medium">User Details</h2>
        <div className='flex items-center gap-5'>
          <button className='font-semibold text-sm text-[#E4033B] border border-[#E4033B] px-4 py-3'>Blacklist User</button>
          <button className='font-semibold text-sm text-[#39CDCC] border border-[#39CDCC] px-4 py-3'>Activate User</button>
        </div>
      </div>
      <UserProfile
        loanRepayment={loanRepayment}
        accountBalance={accountBalance}
        accountNumber={phoneNumber}
        bvn={bvn}
        fullname={fullName}
        avatar={avatar}
        userBank={userBank}
      />
      <div className="user-info p-8 bg-white shadow-[3px__0__20px__#0000000a]">
        <PersonalInfo
          fullName={fullName}
          email={email}
          bvn={bvn}
          gender={gender}
          phoneNumber={phoneNumber}
          maritalStatus={maritalStatus}
          userChildren={userChildren}
          typeOfResidence={typeOfResidence}
        />
        <Education
          employmentDuration={employmentDuration}
          employmentStatus={employmentStatus}
          sectorOfEmployment={sectorOfEmployment}
          userIncomeFrom={userIncomeFrom}
          userIncomeTo={userIncomeTo}
          loe={loe}
          loanRepayment={csv(loanRepayment)}
          officeEmail={officeEmail}
        />
        <Socials
          twitter={twitter}
          facebook={facebook}
          instagram={instagram}
        />
        <Guarantor
          guarantorEmail={email}
          guarantorFullName={guarantorFullName}
          guarantorPhone={guarantorPhone}
          guarantorRelationship={maritalStatus}
        />
      </div>
    </div>
  )
}

export default User