import Image from 'next/image';
import React, { useState } from 'react';
import styles from "../styles/Header.module.css"

//  import icons
import { FaCaretDown, FaRegBell, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [flip, setFlip] = useState(false)

  function handleBurger() {
    setFlip(!flip)
  }

  return (
    <header className='w-full flex items-center justify-between px-5 py-4 lg:py-8 lg:px-20 relative bg-white shadow-[3px__0__20px__#0000000a]'>
      <div className='flex gap-40 items-center'>
        <div className="logo">
          <Image
            src="/assets/icons/header-logo.svg"
            alt="logo"
            width={140}
            height={30}
            className={"hidden lg:block"}
          />
          <Image
            src="/assets/icons/header-logo.svg"
            alt="logo"
            width={100}
            height={30}
            className={"lg:hidden"}
          />
        </div>
        <div className="search lg:flex hidden">
          <input type="text" name='search' placeholder='Search for anything' className='bg-white border-y border-l border-[#213F7D] text-sm py-3 px-5 w-[400px] rounded-[8px__0__0__8px]' />
          <button className='bg-[#39CDCC] text-whites w-[56px] text-white flex justify-center items-center rounded-[0__8px__8px__0] '>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className='lg:flex items-center gap-12 hidden'>
        <a href="#" className='underline'>Docs</a>
        <span className='text-2xl'>
          <FaRegBell />
        </span>

        <div className="admin flex items-center gap-3">
          <div className="avatar">
            <Image
              src="/assets/images/avatar.png"
              alt="Your Name"
              width={48}
              height={48}
              className={"rounded-full cursor-pointer"}
            />
          </div>
          <p className='cursor-pointer flex gap-3 items-center text-base'>Adedeji
            <FaCaretDown />
          </p>
        </div>
      </div>

      <div className="search-burger flex gap-3 items-center lg:hidden">
        <div className="search">
          <FaSearch />
        </div>
        <div className="burger-menu" onClick={handleBurger}>
          <div className="flex flex-col items-center justify-center w-[24px] h-[24px] cursor-pointer relative">
            <div className={`${flip && styles.top} top w-[10px] h-[2px] bg-[#000] absolute left-0 top-[4px]`}></div>
            <div className={`${flip && styles.center} center w-[20px] h-[2px] bg-[#000]`}></div>
            <div className={`${flip && styles.bottom} bottom w-[10px] h-[2px] bg-[#000] absolute right-0 bottom-[4px]`}></div>
          </div>
        </div>
      </div>

      <div className={`mobile-user lg:hidden absolute right-0 top-full bg-white w-[50%] flex flex-col gap-4 p-6 ${flip && styles.translate} translate-x-full transition-all ease-in-out duration-500 z-20`}>
        <p className='flex items-center gap-3'>
          <span className='text-2xl'>
            <FaRegBell />
          </span> <span>Notifications</span>
        </p>
        <div className="admin flex items-center gap-3">
          <div className="avatar">
            <Image
              src="/assets/images/avatar.png"
              alt="Your Name"
              width={48}
              height={48}
              className={"lg:w-[48px] lg:h-[48px] rounded-full cursor-pointer"}
            />
          </div>
          <p className='cursor-pointer flex gap-3 items-center text-base'>Adedeji
            <FaCaretDown />
          </p>
        </div>

      </div>
    </header>
  )
}

export default Header;