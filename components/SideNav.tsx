import React, { useState } from 'react'
import styles from "../styles/SideNav.module.css"
import { FaBriefcase, FaCaretDown, FaChartBar, FaClipboardList, FaCoins, FaEye, FaHandshake, FaHome, FaPiggyBank, FaScroll, FaSlidersH, FaUserCheck, FaUserCog, FaUserFriends, FaUsers, FaUserTimes } from 'react-icons/fa'
import { GiGalaxy } from "react-icons/gi"
import Link from 'next/link'
import { useRouter } from 'next/router'

const SideNav = () => {
  const [close, setClose] = useState(true)

  function closeSideNav() {
    setClose(!close)
  }

  return (
    <div className='lg:w-[20%] min-h-full'>
      <div className='eye px-[1.6rem] text-2xl cursor-pointer flex justify-end bg-[#39CDCCab] absolute top-0 left-0 z-40 lg:hidden' onClick={closeSideNav}><FaEye /></div>
      <div className={`flex flex-col gap-11 ${styles.li} ${close && "translate-x-[-100%]"} absolute top-0 lg:static py-8 lg:py-10 bg-white shadow-[3px__0__20px__#0000000a] transition-all ease-in-out duration-500 h-full lg:translate-x-0`}>
        <div className='flex gap-[.8rem] items-center px-[1.6rem] cursor-pointer '> <FaBriefcase /><p>Switch Organization</p> <FaCaretDown /></div>
        <div className=''>
          <Link href="/dashboard/users" className='flex gap-[.8rem] items-center px-[1.6rem] cursor-pointer'>
            <FaHome /><p>Dashboard</p>
          </Link>
        </div>

        <div >
          <p className='px-[1.6rem]'>CUSTOMERS</p>
          <ul className='mt-2'>
            <Li pathname={"/dashboard/users"} icon={<FaUserFriends />} text={"Users"} />
            <Li pathname={"/dashboard/guarantors"} icon={<FaUsers />} text={"Guarantors"} />
            <Li pathname={"/dashboard/loans"} icon={<MoneySack />} text={"Loans"} />
            <Li pathname={"/dashboard/decision-model"} icon={<FaHandshake />} text={"Decision Models"} />
            <Li pathname={"/dashboard/savings"} icon={<FaPiggyBank />} text={"Savings"} />
            <Li pathname={"/dashboard/loan-request"} icon={<LoanRequest />} text={"Loan Requests"} />
            <Li pathname={"/dashboard/whitelist"} icon={<FaUserCheck />} text={"Whitelist"} />
            <Li pathname={"/dashboard/karma"} icon={<FaUserTimes />} text={"Karma"} />
          </ul>
        </div >


        <div>
          <p className='px-[1.6rem]'>BUSINESSES</p>
          <ul className='mt-2'>
            <Li pathname={"/dashboard/organization"} icon={<FaBriefcase />} text={"Organization"} />
            <Li pathname={"/dashboard/loan-product"} icon={<LoanRequest />} text={"Loan Products"} />
            <Li pathname={"/dashboard/saving-product"} icon={<NpBank />} text={"Savings Products"} />
            <Li pathname={"/dashboard/fees-and-charges"} icon={<FaCoins />} text={"Fees and Charges"} />
            <Li pathname={"/dashboard/transactions"} icon={<Transactions />} text={"Transactions"} />
            <Li pathname={"/dashboard/services"} icon={<GiGalaxy />} text={"Services"} />
            <Li pathname={"/dashboard/services-account"} icon={<FaUserCog />} text={"Service Account"} />
            <Li pathname={"/dashboard/settlements"} icon={<FaScroll />} text={"Settlements"} />
            <Li pathname={"/dashboard/reports"} icon={<FaChartBar />} text={"Reports"} />
          </ul >
        </div >


        <div>
          <p className='px-[1.6rem]'>SETTINGS</p>
          <ul className='mt-2'>
            <Li pathname={"/dashboard/preferences"} icon={<FaSlidersH />} text={"Preferences"} />
            <Li pathname={"/dashboard/fees-and-pricing"} icon={<BadgePercent />} text={"Fees and Pricing"} />
            <Li pathname={"/dashboard/audit-logs"} icon={<FaClipboardList />} text={"Audit Logs"} />
          </ul >
        </div >
      </div >
    </div>
  )

}


export const Li = ({ pathname, text, icon }: any) => {

  const router = useRouter()
  return (
    <li><Link className={`${router.pathname.includes(pathname) && "active"}`} href={pathname}>{icon}{text}</Link></li>
  )
}

export const MoneySack = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M6.00006 3H10.0001L11.4813 0.7775C11.5316 0.702204 11.5604 0.614683 11.5648 0.524274C11.5692 0.433865 11.549 0.343958 11.5063 0.264145C11.4636 0.184332 11.4 0.117607 11.3224 0.0710869C11.2447 0.024567 11.1559 -2.23135e-06 11.0654 1.51993e-10L4.93569 1.51993e-10C4.84517 -2.23135e-06 4.75635 0.024567 4.67871 0.0710869C4.60106 0.117607 4.5375 0.184332 4.4948 0.264145C4.4521 0.343958 4.43187 0.433865 4.43627 0.524274C4.44066 0.614683 4.46952 0.702204 4.51975 0.7775L6.00006 3ZM10.0001 4H6.00006C-0.324311 7.60625 0.00287671 12.395 0.00287671 13C0.00287671 14.6562 1.53756 16 3.43038 16H12.5704C14.4635 16 15.9979 14.6562 15.9979 13C15.9979 12.4062 16.2901 7.58625 10.0001 4Z" fill="#213F7D" />
      <path d="M5.87516 12.2037V9.94087H5V9.25493H5.87516V7H7.11301L8.34297 9.25493H9.17871V7H10.1248V9.25493H11V9.94087H10.1248V12.2037H8.88699L7.64126 9.94087H6.82129V12.2037H5.87516ZM6.82129 9.18397V9.25493H7.26281L6.80552 8.33246H6.79763L6.82129 9.18397ZM9.19448 10.8949H9.21025L9.17871 10.0749V9.94087H8.71353L8.74507 9.98817L9.19448 10.8949Z" fill="#213F7D" />
    </svg>

  )
}

export default SideNav

export const LoanRequest = () => {
  return (
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.625 12.7813L12.9 16.5625C12.545 16.8459 12.1042 17.0002 11.65 17H0.5C0.367392 17 0.240215 16.9473 0.146447 16.8536C0.0526784 16.7598 0 16.6326 0 16.5V13.5C0 13.3674 0.0526784 13.2402 0.146447 13.1464C0.240215 13.0527 0.367392 13 0.5 13H2.23125L3.68438 11.8219C4.3392 11.2905 5.15673 11.0004 6 11H11C11.1458 10.9997 11.2898 11.0313 11.4221 11.0926C11.5543 11.1538 11.6716 11.2433 11.7657 11.3546C11.8598 11.4659 11.9284 11.5965 11.9667 11.7371C12.005 11.8778 12.0121 12.0251 11.9875 12.1688C11.9063 12.6594 11.4437 13 10.9469 13H8.5C8.36739 13 8.24021 13.0527 8.14645 13.1464C8.05268 13.2402 8 13.3674 8 13.5C8 13.6326 8.05268 13.7598 8.14645 13.8536C8.24021 13.9473 8.36739 14 8.5 14H12.1969C12.6513 14.0012 13.0924 13.8468 13.4469 13.5625L16.3344 11.2531C16.7219 10.9406 17.2969 10.9188 17.6656 11.2531C17.7744 11.3499 17.8606 11.4693 17.9185 11.6029C17.9763 11.7365 18.0042 11.8811 18.0004 12.0266C17.9965 12.1722 17.9609 12.3151 17.8961 12.4454C17.8312 12.5758 17.7387 12.6904 17.625 12.7813V12.7813Z" fill="#213F7D" />
      <path opacity="0.4" d="M7.75004 1.875H10.25L11.1758 0.485937C11.2072 0.438878 11.2253 0.384177 11.228 0.327671C11.2307 0.271165 11.2181 0.214974 11.1914 0.165091C11.1647 0.115208 11.125 0.0735042 11.0765 0.0444293C11.0279 0.0153544 10.9724 -1.39459e-06 10.9159 0L7.08481 0C7.02823 -1.39459e-06 6.97272 0.0153544 6.92419 0.0444293C6.87566 0.0735042 6.83594 0.115208 6.80925 0.165091C6.78256 0.214974 6.76992 0.271165 6.77267 0.327671C6.77541 0.384177 6.79345 0.438878 6.82485 0.485937L7.75004 1.875ZM10.25 2.5H7.75004C3.79731 4.75391 4.0018 7.74687 4.0018 8.125C4.0018 9.16016 4.96098 10 6.14399 10H11.8565C13.0397 10 13.9987 9.16016 13.9987 8.125C13.9987 7.75391 14.1813 4.74141 10.25 2.5Z" fill="#213F7D" />
      <path d="M7.67198 7.6273V6.21304H7.125V5.78433H7.67198V4.375H8.44563L9.21436 5.78433H9.7367V4.375H10.328V5.78433H10.875V6.21304H10.328V7.6273H9.55437L8.77579 6.21304H8.2633V7.6273H7.67198ZM8.2633 5.73998V5.78433H8.53926L8.25345 5.20779H8.24852L8.2633 5.73998ZM9.74655 6.8093H9.75641L9.7367 6.29681V6.21304H9.44596L9.46567 6.24261L9.74655 6.8093Z" fill="#213F7D" />
    </svg>

  )
}

export const NpBank = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.77405 6.66958L9.77966 6.66577L9.75986 6.59627C9.71628 6.44334 9.56404 6.32762 9.39893 6.34768C9.3677 6.34937 9.29243 6.35927 9.19015 6.38426C9.07401 6.41263 8.91758 6.46171 8.74078 6.54491C8.40546 6.7027 7.99711 6.98318 7.65263 7.47626C7.38764 7.30785 6.97329 7.15788 6.42656 7.29393C6.29058 7.31879 6.17487 7.43287 6.17123 7.59219C6.08095 8.23014 6.30843 8.84742 6.61302 9.35902C6.91331 9.86339 7.2949 10.2758 7.54664 10.521C7.56252 10.5582 7.58046 10.594 7.59546 10.6239L7.59572 10.6244C7.611 10.6549 7.62174 10.6766 7.62824 10.6922C7.63643 10.8631 7.64825 11.0075 7.66011 11.1146C7.66621 11.1697 7.6724 11.2157 7.67825 11.2506C7.68116 11.268 7.68414 11.2836 7.68719 11.2966C7.68869 11.3031 7.6909 11.3122 7.69415 11.3218C7.72457 11.4852 7.88324 11.5874 8.03114 11.5874H8.07927V11.5882L8.09185 11.5866C8.2732 11.5636 8.41341 11.385 8.36927 11.1959L8.36856 11.1914L8.3649 11.1666C8.36177 11.1447 8.35739 11.1121 8.3525 11.07C8.34364 10.9937 8.3331 10.8866 8.32525 10.7559C8.56208 10.4972 9.20009 9.75682 9.52869 9.10031L9.5287 9.10031L9.52941 9.09883C9.81887 8.49605 9.87593 7.88281 9.86164 7.41681C9.85448 7.18344 9.8294 6.98594 9.8061 6.84366C9.79445 6.77249 9.78325 6.71516 9.77501 6.67436L9.77405 6.66958ZM6.98184 8.07859C6.92088 8.12218 6.88061 8.17847 6.85875 8.23969C6.83691 8.13851 6.82344 8.03686 6.82012 7.93543C6.98558 7.93505 7.11764 7.97423 7.2192 8.02466C7.14075 8.01591 7.05968 8.03346 6.99034 8.07313L6.99009 8.07269L6.98184 8.07859ZM8.89408 8.78798C8.75732 9.05724 8.55612 9.35211 8.35426 9.61323C8.44355 9.07764 8.62867 8.48308 9.00882 7.96332L9.00882 7.96332L9.00944 7.96245C9.11806 7.81055 9.09969 7.60221 8.93814 7.48668C8.82306 7.40439 8.67557 7.39499 8.5606 7.46553C8.76997 7.28696 8.97679 7.18321 9.13932 7.1228C9.20053 7.49403 9.20814 8.15933 8.9024 8.77133L8.89408 8.78798ZM8.00878 8.17271C8.14762 7.90649 8.30804 7.70283 8.47053 7.54702C8.46801 7.55028 8.46552 7.55361 8.46308 7.55701C8.17363 7.94345 7.97563 8.36365 7.84141 8.77626C7.86208 8.57287 7.9147 8.36898 8.00878 8.17271Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M4.46 11.84C4.46 12.0234 4.61665 12.18 4.8 12.18C4.98335 12.18 5.14 12.0234 5.14 11.84V5.76C5.14 5.57665 4.98335 5.42 4.8 5.42C4.61665 5.42 4.46 5.57665 4.46 5.76V11.84Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M2.86 11.84C2.86 12.0234 3.01665 12.18 3.2 12.18C3.38336 12.18 3.54 12.0234 3.54 11.84V5.76C3.54 5.57665 3.38336 5.42 3.2 5.42C3.01665 5.42 2.86 5.57665 2.86 5.76V11.84Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M10.86 11.84C10.86 12.0234 11.0166 12.18 11.2 12.18C11.3834 12.18 11.54 12.0234 11.54 11.84V5.76C11.54 5.57665 11.3834 5.42 11.2 5.42C11.0166 5.42 10.86 5.57665 10.86 5.76V11.84Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M12.46 11.84C12.46 12.0234 12.6167 12.18 12.8 12.18C12.9834 12.18 13.14 12.0234 13.14 11.84V5.76C13.14 5.57665 12.9834 5.42 12.8 5.42C12.6167 5.42 12.46 5.57665 12.46 5.76V11.84Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M13.36 5.3H13.5821L13.5367 5.24873C13.6336 5.18874 13.7013 5.08323 13.7148 4.97134L13.7156 4.97143V4.95929C13.7156 4.8291 13.6337 4.69699 13.517 4.64605L8.18349 1.46844C8.08117 1.39471 7.94245 1.40256 7.83672 1.46611C7.83667 1.46613 7.83663 1.46615 7.83659 1.46618L2.47688 4.66601L2.47682 4.6659L2.47268 4.66866C2.35045 4.75014 2.2755 4.88566 2.31859 5.04571C2.34564 5.1924 2.48646 5.3 2.64001 5.3H13.36ZM12.119 4.62H3.86583L7.99992 2.1484L12.119 4.62Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M2.64 12.98H13.36C13.5434 12.98 13.7 12.8234 13.7 12.64C13.7 12.4566 13.5434 12.3 13.36 12.3H2.64C2.45665 12.3 2.3 12.4566 2.3 12.64C2.3 12.8234 2.45665 12.98 2.64 12.98Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M1.84 13.78H14.16C14.3434 13.78 14.5 13.6234 14.5 13.44C14.5 13.2566 14.3434 13.1 14.16 13.1H1.84C1.65665 13.1 1.5 13.2566 1.5 13.44C1.5 13.6234 1.65665 13.78 1.84 13.78Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
      <path d="M1.04 14.58H14.96C15.1434 14.58 15.3 14.4234 15.3 14.24C15.3 14.0566 15.1434 13.9 14.96 13.9H1.04C0.85665 13.9 0.700003 14.0566 0.700003 14.24C0.700003 14.4234 0.85665 14.58 1.04 14.58Z" fill="#213F7D" stroke="#213F7D" strokeWidth="0.2" />
    </svg>

  )
}

export const Transactions = () => {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.0001 5.94542V0.999364C13.0001 0.734985 12.8941 0.47999 12.7066 0.292506C12.5191 0.105022 12.2651 0 11.9998 0H1.0003C0.448119 0 0 0.447183 0 0.999364V16.9994C0 17.2647 0.104998 17.5187 0.292506 17.7062C0.480014 17.8937 0.735009 17.9997 1.0003 17.9997H11.9998C12.2651 17.9997 12.5191 17.8937 12.7066 17.7062C12.8941 17.5187 13.0001 17.2647 13.0001 16.9994V12.9446H11.9998V16.9994H1.0003V0.999364H11.9998V5.94542H13.0001Z" fill="#213F7D" />
      <path d="M1.99965 13.9946H10.9995V14.9949H1.99965V13.9946Z" fill="#213F7D" />
      <path d="M1.99965 2.49548H10.9995V3.49578H1.99965V2.49548Z" fill="#213F7D" />
      <path d="M5.74956 15.4946C5.47395 15.4946 5.24989 15.7186 5.24989 15.9952C5.24989 16.2708 5.47395 16.4948 5.74956 16.4948H7.24953C7.52608 16.4948 7.75014 16.2708 7.75014 15.9952C7.75014 15.7186 7.52608 15.4946 7.24953 15.4946H5.74956Z" fill="#213F7D" />
      <path d="M10.9995 6.44507H6.49954V4.44543L2.50026 6.94475L6.49954 9.44501V7.44537H10.9995V6.44507Z" fill="#213F7D" />
      <path d="M16 9.44503L11.9998 6.94476V8.94534H7.49985V9.9447H11.9998V11.9453L16 9.44503Z" fill="#213F7D" />
    </svg>

  )
}

export const BadgePercent = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3_34)">
        <path opacity="0.4" d="M16.0001 7.99999C16.0001 7.44018 15.8292 6.89369 15.5104 6.43356C15.1915 5.97342 14.7398 5.62156 14.2157 5.42499C14.4469 4.91549 14.5172 4.34758 14.4172 3.79707C14.3172 3.24657 14.0516 2.73967 13.656 2.34403C13.2604 1.9484 12.7535 1.68285 12.203 1.58285C11.6525 1.48285 11.0846 1.55315 10.5751 1.78437C10.3785 1.26015 10.0267 0.808394 9.56655 0.489485C9.10641 0.170576 8.5599 -0.000296593 8.00005 -0.000296593C7.4402 -0.000296593 6.89369 0.170576 6.43355 0.489485C5.97342 0.808394 5.62158 1.26015 5.42505 1.78437C4.91555 1.55315 4.34764 1.48285 3.79713 1.58285C3.24663 1.68285 2.73973 1.9484 2.34409 2.34403C1.94845 2.73967 1.68291 3.24657 1.58291 3.79707C1.48291 4.34758 1.55321 4.91549 1.78443 5.42499C1.2602 5.62152 0.808453 5.97336 0.489544 6.4335C0.170635 6.89363 -0.000237465 7.44014 -0.000237465 7.99999C-0.000237465 8.55984 0.170635 9.10635 0.489544 9.56649C0.808453 10.0266 1.2602 10.3785 1.78443 10.575C1.55321 11.0845 1.48291 11.6524 1.58291 12.2029C1.68291 12.7534 1.94845 13.2603 2.34409 13.656C2.73973 14.0516 3.24663 14.3171 3.79713 14.4171C4.34764 14.5171 4.91555 14.4468 5.42505 14.2156C5.62158 14.7398 5.97342 15.1916 6.43355 15.5105C6.89369 15.8294 7.4402 16.0003 8.00005 16.0003C8.5599 16.0003 9.10641 15.8294 9.56655 15.5105C10.0267 15.1916 10.3785 14.7398 10.5751 14.2156C11.0846 14.4468 11.6525 14.5171 12.203 14.4171C12.7535 14.3171 13.2604 14.0516 13.656 13.656C14.0516 13.2603 14.3172 12.7534 14.4172 12.2029C14.5172 11.6524 14.4469 11.0845 14.2157 10.575C14.7398 10.3784 15.1915 10.0266 15.5104 9.56643C15.8292 9.10629 16.0001 8.5598 16.0001 7.99999V7.99999ZM6.00005 4.99999C6.19783 4.99999 6.39117 5.05864 6.55562 5.16852C6.72007 5.2784 6.84824 5.43458 6.92393 5.61731C6.99962 5.80003 7.01942 6.0011 6.98084 6.19508C6.94225 6.38906 6.84701 6.56725 6.70716 6.7071C6.56731 6.84695 6.38912 6.94219 6.19514 6.98078C6.00116 7.01936 5.80009 6.99956 5.61737 6.92387C5.43464 6.84818 5.27846 6.72001 5.16858 6.55556C5.0587 6.39111 5.00005 6.19777 5.00005 5.99999C5.00005 5.73478 5.10541 5.48042 5.29294 5.29289C5.48048 5.10535 5.73483 4.99999 6.00005 4.99999V4.99999ZM6.3838 10.6766C6.33737 10.723 6.28225 10.7598 6.22158 10.785C6.16091 10.8101 6.09588 10.823 6.03021 10.823C5.96454 10.823 5.89951 10.8101 5.83884 10.785C5.77817 10.7598 5.72304 10.723 5.67661 10.6766L5.32318 10.3231C5.27673 10.2767 5.23989 10.2216 5.21476 10.1609C5.18963 10.1002 5.17669 10.0352 5.17669 9.96952C5.17669 9.90385 5.18963 9.83882 5.21476 9.77815C5.23989 9.71748 5.27673 9.66236 5.32318 9.61593L9.61599 5.32312C9.66242 5.27668 9.71754 5.23984 9.77821 5.2147C9.83888 5.18957 9.90391 5.17663 9.96958 5.17663C10.0353 5.17663 10.1003 5.18957 10.1609 5.2147C10.2216 5.23984 10.2767 5.27668 10.3232 5.32312L10.6766 5.67655C10.7231 5.72298 10.7599 5.77811 10.785 5.83878C10.8102 5.89945 10.8231 5.96448 10.8231 6.03015C10.8231 6.09582 10.8102 6.16085 10.785 6.22152C10.7599 6.28219 10.7231 6.33731 10.6766 6.38374L6.3838 10.6766ZM10.0001 11C9.80227 11 9.60893 10.9413 9.44448 10.8315C9.28003 10.7216 9.15186 10.5654 9.07617 10.3827C9.00048 10.1999 8.98068 9.99888 9.01927 9.8049C9.05785 9.61092 9.15309 9.43274 9.29294 9.29288C9.4328 9.15303 9.61098 9.05779 9.80496 9.01921C9.99894 8.98062 10.2 9.00042 10.3827 9.07611C10.5655 9.1518 10.7216 9.27997 10.8315 9.44442C10.9414 9.60887 11.0001 9.80221 11.0001 9.99999C11.0001 10.2652 10.8947 10.5196 10.7072 10.7071C10.5196 10.8946 10.2653 11 10.0001 11Z" fill="#213F7D" />
        <path d="M6 5C6.19778 5 6.39112 5.05865 6.55557 5.16853C6.72002 5.27841 6.84819 5.43459 6.92388 5.61732C6.99957 5.80004 7.01937 6.00111 6.98079 6.19509C6.9422 6.38907 6.84696 6.56725 6.70711 6.70711C6.56725 6.84696 6.38907 6.9422 6.19509 6.98079C6.00111 7.01937 5.80004 6.99957 5.61732 6.92388C5.43459 6.84819 5.27841 6.72002 5.16853 6.55557C5.05865 6.39112 5 6.19778 5 6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5V5ZM6.38375 10.6766C6.33732 10.723 6.28219 10.7598 6.22152 10.785C6.16085 10.8101 6.09583 10.823 6.03016 10.823C5.96449 10.823 5.89946 10.8101 5.83879 10.785C5.77812 10.7598 5.72299 10.723 5.67656 10.6766L5.32312 10.3231C5.27668 10.2767 5.23984 10.2216 5.21471 10.1609C5.18957 10.1002 5.17664 10.0352 5.17664 9.96953C5.17664 9.90386 5.18957 9.83883 5.21471 9.77816C5.23984 9.71749 5.27668 9.66237 5.32312 9.61594L9.61594 5.32312C9.66237 5.27668 9.71749 5.23984 9.77816 5.21471C9.83883 5.18957 9.90386 5.17664 9.96953 5.17664C10.0352 5.17664 10.1002 5.18957 10.1609 5.21471C10.2216 5.23984 10.2767 5.27668 10.3231 5.32312L10.6766 5.67656C10.723 5.72299 10.7598 5.77812 10.785 5.83879C10.8101 5.89946 10.823 5.96449 10.823 6.03016C10.823 6.09583 10.8101 6.16085 10.785 6.22152C10.7598 6.28219 10.723 6.33732 10.6766 6.38375L6.38375 10.6766ZM10 11C9.80222 11 9.60888 10.9414 9.44443 10.8315C9.27998 10.7216 9.15181 10.5654 9.07612 10.3827C9.00043 10.2 8.98063 9.99889 9.01921 9.80491C9.0578 9.61093 9.15304 9.43275 9.29289 9.29289C9.43275 9.15304 9.61093 9.0578 9.80491 9.01921C9.99889 8.98063 10.2 9.00043 10.3827 9.07612C10.5654 9.15181 10.7216 9.27998 10.8315 9.44443C10.9414 9.60888 11 9.80222 11 10C11 10.2652 10.8946 10.5196 10.7071 10.7071C10.5196 10.8946 10.2652 11 10 11Z" fill="#213F7D" />
      </g>
      <defs>
        <clipPath id="clip0_3_34">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}