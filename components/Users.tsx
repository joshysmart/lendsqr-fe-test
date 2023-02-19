import Meta from "@/components/Meta";
import { db } from "@/db/db.config";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MdFilterList, MdMoreVert } from "react-icons/md";
import { Pagination, TablePagination } from "@mui/material";
import Link from "next/link";
import { FaEye, FaUser, FaUserTimes } from "react-icons/fa";
import Filter from "./Filter";


function Users(): JSX.Element {
  const optionEl = useRef<HTMLUListElement>(null)
  const hasAdmin = useLiveQuery(() => db.admin.count(), []);
  const hasUsers = useLiveQuery(() => db.users.count(), []);
  const users = useLiveQuery(() => db.users.toArray(), []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = hasUsers ? Math.ceil(hasUsers / rowsPerPage) : 0;
  const [showFilter, setShowFilter] = useState(false)

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);
  const slicedUsers = users?.slice(from, to);

  const status = [{ status: "inactive", color: "text-[#545F7D]", bg: "bg-[#545F7D1a]" }, { status: "pending", color: "text-[#E9B200]", bg: "bg-[#E9B2001a]" }, { status: "blacklisted", color: "text-[#E4033B]", bg: "bg-[#E4033B1a]" }, { status: "active", color: "text-[#39CD62]", bg: "bg-[#39CD621a]" }];

  const router = useRouter();

  useEffect(() => {
    if (hasAdmin === 0) {
      router.push("/auth/login")
    }

    if (!hasUsers && hasUsers! < 1) {
      fetch("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
        .then((res) => res.json()).then((data) => {
          db.users.bulkAdd(data);
        })
    }
  }, [hasAdmin, hasUsers, router])


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    console.log(value);
    setFrom((value - 1) * 10);
    setTo((value - 1) * 10 + 10);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    setFrom(newPage * 10);
    setTo(newPage * 10 + 10);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setFrom(0);
    setTo(parseInt(event.target.value));
    console.log(rowsPerPage);
  };

  let clicked: string
  function handleOptions(e: any) {
    const index = e.currentTarget.dataset.index;
    const options = optionEl.current!.querySelectorAll(".options");
    options.forEach((option) => {
      if (index !== clicked) {
        option.classList.add("hidden");
      }
    })

    if (index === clicked) {
      options[index].classList.toggle("hidden");
    } else {
      clicked = index;
      options[index].classList.toggle("hidden");
    }

  }

  function handleShowFilter(e: any) {
    setShowFilter(!showFilter);
  }

  const userList = slicedUsers?.map((user: any, i: any) => {
    const dateJoined = new Date(user?.createdAt).toDateString().split(" ");
    const month = dateJoined[1];
    const date = dateJoined[2];
    const year = dateJoined[3];

    const timeJoined = new Date(user?.createdAt);
    const hour = timeJoined.getHours();
    const minute = timeJoined.getMinutes();
    const period = (hour) > 12 ? "AM" : "PM";

    const chosenStatus = status[Math.floor(Math.random() * 4)];
    const orgName = user?.orgName.split("-").join(" ");
    const phoneNumber = user?.phoneNumber.split("x")[0];


    return <ul key={user?.id} className={"relative"} >
      <Link className={"grid items-center grid-cols-6 py-6 px-8 border-b border-[#213F7D1A] cursor-pointer capitalize hover:bg-[#38cccc0f] "} href={`/dashboard/users/${user.id}`}>
        <li className="text-sm font-normal">{orgName}</li>
        <li className="text-sm font-normal">{user?.userName}</li>
        <li className="text-sm font-normal pr-3">{user.email}</li>
        <li className="text-sm font-normal">{phoneNumber}</li>
        <li className="text-sm font-normal">{`${month} ${date}, ${year} ${hour}:${minute} ${period}`}</li>
        <li className={`text-sm font-normal text-center  flex items-center justify-between`}>
          <span className={`${chosenStatus.color} ${chosenStatus.bg} py-2 px-8 rounded-full`}>{chosenStatus.status}</span></li>
      </Link>
      <div className="absolute right-12 top-0 w-4 z-30 cursor-pointer h-full flex items-center justify-center" onClick={handleOptions} data-index={i}>
        <span className="text-2xl"><MdMoreVert /></span>
      </div>

      <div className="options absolute right-[6rem] top-0 bg-white shadow-[3px__0__20px__#0000000a] p-8 text-sm font-medium hidden z-40">
        <ul className="flex flex-col gap-5">
          <li className="flex gap-3 items-center"><FaEye /> View Details</li>
          <li className="flex gap-3 items-center"><FaUserTimes /> Blacklist User</li>
          <li className="flex gap-3 items-center"><FaUser /> Activate User</li>
        </ul>
      </div>
    </ul>;
  });

  return (
    <div className="w-full lg:w-[80%] px-5 py-8 lg:p-16">
      <h2 className="text-2xl font-medium">Users</h2>
      <div className="my-5 lg:my-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
        <UserCard icon={<NpFriends />} userClass={"Users"} noOfUsers={"2,453"} bg={"bg-[#df18ff1a]"} />
        <UserCard icon={<NpUsers />} userClass={"Active Users"} noOfUsers={"2,453"} bg={"bg-[#5718FF1a]"} />
        <UserCard icon={<NpLoan />} userClass={"Users with Loans"} noOfUsers={"12,453"} bg={"bg-[#F55F441a]"} />
        <UserCard icon={<NpMoney />} userClass={"Users with Savings"} noOfUsers={"102,453"} bg={"bg-[#FF33661a]"} />
      </div>

      <div className="bg-white shadow-[3px__0__20px__#0000000a] overflow-x-scroll">
        <div className="min-w-max">
          <ul className="head grid grid-cols-6 py-8 px-8 ">
            <li className="flex items-center gap-3 text-xs font-semibold uppercase  ">organization <span className="cursor-pointer" onClick={handleShowFilter}><MdFilterList /></span></li>
            <li className="flex items-center gap-3 text-xs font-semibold uppercase  ">Username <span className="cursor-pointer" onClick={handleShowFilter}><MdFilterList /></span></li>
            <li className="flex items-center gap-3 text-xs font-semibold uppercase  ">Email <span className="cursor-pointer" onClick={handleShowFilter}><MdFilterList /></span></li>
            <li className="flex items-center gap-3 text-xs font-semibold uppercase  ">Phone number <span className="cursor-pointer" onClick={handleShowFilter}><MdFilterList /></span></li>
            <li className="flex items-center gap-3 text-xs font-semibold uppercase  ">Date joined <span className="cursor-pointer" onClick={handleShowFilter}><MdFilterList /></span></li>
            <li className="flex items-center gap-3 text-xs font-semibold uppercase  ">Status <span className="cursor-pointer" onClick={handleShowFilter}><MdFilterList /></span></li>
          </ul>
          <ul className="body relative" ref={optionEl}>
            {userList}
            <Filter showFilter={showFilter} />
          </ul>
        </div>
      </div>

      <div className="paginatiom flex flex-col lg:flex-row justify-between mt-5">
        <div className="">
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <div className="min-w-max">
          <Pagination count={totalPages} page={page + 1} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default Users;

// user card component

export const UserCard = ({ bg, icon, userClass, noOfUsers }: any) => {
  return (
    <div className="flex flex-col gap-3 bg-white shadow-[3px__0__20px__#0000000a] p-8 rounded">
      <div className={`icon ${bg} w-[40px] h-[40px] rounded-full flex items-center justify-center `}>{icon}</div>
      <p className="text-sm font-medium">{userClass}</p>
      <p className="text-2xl font-semibold">{noOfUsers}</p>
    </div>
  )
}

// svg icon component
export const NpUsers = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.40884 20.7755L5.40886 20.7753C5.24278 20.7637 5.10515 20.6935 5.01025 20.5773C4.93555 20.4858 4.89119 20.3707 4.87624 20.243H4.86771V20.143C4.86771 18.8381 5.21378 17.6162 5.81343 16.5614H2.43547C2.26479 16.5614 2.11856 16.4984 2.01515 16.3838C1.91292 16.2704 1.85963 16.1146 1.85642 15.9395M5.40884 20.7755L1.9564 15.9373M5.40884 20.7755H5.41582L18.5545 20.7784C18.8752 20.7784 19.1336 20.5188 19.1336 20.1993C19.1336 18.9325 18.7597 17.6106 18.1653 16.5615L21.564 16.5606C21.8847 16.5606 22.1431 16.301 22.1431 15.9815L22.1431 15.9803C22.1125 13.5787 20.7612 11.5478 18.6421 10.6785C19.7861 9.9512 20.5185 8.6743 20.5185 7.25897C20.5185 3.79603 16.468 1.96132 13.9042 4.20528C12.6927 3.70612 11.307 3.70611 10.0955 4.20528C9.37698 3.57685 8.45387 3.22247 7.48197 3.22247C3.45251 3.22247 1.99532 8.57355 5.35683 10.6801M5.40884 20.7755L5.58352 10.6986C5.54593 10.6774 5.5089 10.6558 5.47243 10.6337C5.4337 10.6487 5.39516 10.6642 5.35683 10.6801M1.85642 15.9395C1.85642 15.9394 1.85642 15.9392 1.85642 15.9391L1.9564 15.9373M1.85642 15.9395C1.85643 15.9396 1.85643 15.9397 1.85643 15.9398L1.9564 15.9373M1.85642 15.9395C1.80092 13.6744 3.27906 11.5403 5.35683 10.6801M1.9564 15.9373C1.90121 13.691 3.38576 11.5712 5.46333 10.7447C5.4273 10.7235 5.39181 10.702 5.35683 10.6801M5.98771 16.4614H5.87133L5.92872 16.5614C5.94812 16.5279 5.96778 16.4946 5.98771 16.4614ZM18.529 5.22079L18.5291 5.22083C20.2108 6.91954 19.1948 9.83041 16.877 10.118C17.3723 8.11422 16.609 6.03532 14.9942 4.82705C16.111 4.10957 17.5823 4.26358 18.529 5.22079ZM7.12484 10.1177C5.71245 9.93785 4.64034 8.71877 4.64034 7.26079C4.64034 4.96075 7.15004 3.62645 9.00804 4.82696C7.39311 6.03507 6.62977 8.1138 7.12484 10.1177ZM15.4988 10.5398C14.118 13.541 9.88199 13.5437 8.50118 10.5398C7.27857 7.87709 9.24237 4.98947 11.9891 4.98904C14.9025 5.02525 16.6823 7.96715 15.4988 10.5398ZM7.64657 11.4198C8.11471 12.2353 8.80141 12.9107 9.63061 13.3566C8.46493 13.7713 7.43565 14.482 6.63473 15.4042L3.04598 15.4043C3.31223 13.0952 5.28107 11.3434 7.64657 11.4198ZM17.3446 15.4042C16.5466 14.4875 15.5227 13.7755 14.3623 13.3621C15.1946 12.9141 15.8859 12.2383 16.3561 11.4198C18.7216 11.3434 20.6905 13.0943 20.9567 15.4042H17.3446ZM6.04801 19.6202C6.1692 18.1942 6.8066 16.8488 7.77185 15.8727C11.3811 12.2248 17.512 14.5852 17.9317 19.6202H6.04801Z" fill="#5718FF" stroke="#5718FF" strokeWidth="0.2" />
      <path d="M14.275 10.3266C14.3596 10.1626 14.3631 10.0006 14.3085 9.86203C14.2548 9.72583 14.1481 9.61917 14.0233 9.55498C13.8985 9.49079 13.7495 9.46592 13.6073 9.50127C13.4625 9.53724 13.3322 9.63383 13.2471 9.79774L13.2395 9.81235C12.7073 10.8176 11.2757 10.8107 10.7509 9.79792C10.6665 9.63421 10.5368 9.53764 10.3924 9.50168C10.2506 9.46634 10.1019 9.49122 9.97737 9.55536C9.85281 9.61949 9.74621 9.72606 9.69258 9.86214C9.638 10.0006 9.6413 10.1624 9.72563 10.3264L9.72569 10.3266C10.6816 12.179 13.3199 12.1791 14.275 10.3266ZM14.275 10.3266L14.1864 10.2808L14.275 10.3265C14.275 10.3265 14.275 10.3265 14.275 10.3266ZM14.1862 10.2807C13.2683 12.061 10.7333 12.061 9.81456 10.2807L13.3358 9.74383H13.3359H13.4019C13.7353 9.34581 14.4545 9.7607 14.1862 10.2807Z" fill="#5718FF" stroke="#5718FF" strokeWidth="0.2" />
    </svg>

  )
}

export const NpFriends = () => {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_5_59)">
        <path d="M10.7809 13.9717L10.8295 14.0592C10.8282 14.0599 10.827 14.0605 10.8257 14.0611L10.7809 13.9717ZM10.7809 13.9717C10.8108 13.9567 10.8408 13.942 10.8707 13.9275L10.8683 13.9231L10.7809 13.9717ZM19.2882 13.4376C19.288 13.4375 19.2879 13.4374 19.2877 13.4374C18.6974 13.1974 18.2366 13.0011 17.9162 12.7334C17.6117 12.4789 17.4326 12.158 17.4084 11.6562C17.6451 11.3531 17.7986 10.9771 17.8978 10.6432C17.9958 10.3135 18.0427 10.0182 18.0633 9.86119C18.4558 9.24651 18.6135 8.62021 18.5473 8.18822C18.8775 7.39118 18.6457 6.74349 18.4261 6.23024C18.2437 5.79195 18.1121 5.42116 18.2809 4.9465L18.3906 4.65427L18.421 4.57335L18.3453 4.53158L18.0153 4.34939L18.0154 4.3492L18.0094 4.3464C16.8165 3.78709 15.4665 3.70847 14.4811 4.12482L14.4811 4.12475L14.4774 4.12645C13.8423 4.4252 13.3485 4.91219 13.1145 5.58763C12.7367 5.90254 12.5609 6.36164 12.5005 6.82114C12.4402 7.27954 12.4932 7.74921 12.5839 8.10501C12.478 8.57831 12.6742 9.21149 13.0676 9.82601C13.0882 9.98264 13.1351 10.2779 13.2331 10.6076C13.3321 10.9411 13.4853 11.3166 13.7213 11.6195C13.6803 12.1225 13.5005 12.4442 13.2003 12.6986C12.8846 12.9661 12.433 13.1624 11.8432 13.4021L11.8273 13.4085C11.4663 13.5531 11.1019 13.699 10.7361 13.8823L10.6428 13.9291L10.6935 14.0203L11.0604 14.6803L11.109 14.7676L11.1964 14.7192C11.4106 14.6004 11.6199 14.5151 11.8355 14.4273C11.9469 14.3819 12.06 14.3358 12.1763 14.2841C12.7413 14.0654 13.3623 13.8217 13.8399 13.4056C14.3245 12.9835 14.6578 12.3878 14.6578 11.4787V11.3317V11.2903L14.6286 11.261L14.5186 11.151C14.3348 10.9672 14.2032 10.6748 14.1177 10.3824C14.0326 10.0915 13.9978 9.81685 13.9978 9.68175V9.57175V9.54789L13.9871 9.5266L13.9501 9.45356L13.9508 9.45323L13.9441 9.44323C13.729 9.12055 13.6145 8.8548 13.5581 8.65968C13.5299 8.56203 13.5164 8.48288 13.5119 8.42371C13.5078 8.36981 13.5115 8.33825 13.5144 8.32519L13.5835 8.18626L13.5999 8.15318L13.5909 8.11736L13.554 7.97041L13.5542 7.97034L13.5519 7.96321C13.4649 7.70202 13.4206 7.34061 13.4558 7.00623C13.4913 6.66818 13.6048 6.38459 13.8062 6.24449L13.9153 6.17201L13.9476 6.15061L13.957 6.11309L13.9936 5.96774C14.1331 5.48179 14.4069 5.14056 14.8894 4.93366L14.8895 4.93372L14.8928 4.93213C15.5387 4.62634 16.4281 4.64713 17.2688 4.97767C17.1823 5.59109 17.3669 6.06782 17.5437 6.49091C17.5559 6.52514 17.568 6.55867 17.5799 6.59159C17.749 7.05944 17.8734 7.40389 17.6218 7.87463L17.6213 7.87434L17.6172 7.8847L17.5441 8.06774L17.5275 8.10927L17.5474 8.14932L17.6185 8.29223C17.6188 8.29412 17.6196 8.2984 17.6202 8.30578C17.6214 8.32077 17.6216 8.34272 17.6196 8.37185C17.6155 8.42989 17.603 8.5108 17.5767 8.61141C17.5245 8.81185 17.4188 9.0863 17.223 9.40749L17.1505 9.51367L17.1331 9.53917V9.57004V9.67376C17.1144 9.82136 17.0783 10.0957 16.999 10.3821C16.9178 10.6755 16.7951 10.9666 16.6124 11.1493L16.5024 11.2593L16.4731 11.2886V11.33V11.477C16.4731 12.3861 16.8065 12.9818 17.291 13.4039C17.7693 13.8206 18.3913 14.0644 18.957 14.2833C19.5285 14.5045 20.0441 14.71 20.4373 15.0368C20.8038 15.3416 21.0671 15.7552 21.1538 16.4H14.667H14.567V16.5V17.2331V17.3331H14.667H22H22.1V17.2331V16.8661C22.1 15.7212 21.7041 14.9794 21.1466 14.4649C20.595 13.9558 19.8906 13.675 19.2882 13.4376Z" fill="#DF18FF" stroke="#DF18FF" strokeWidth="0.2" />
        <path d="M11.528 11.2079C11.2099 11.006 11.0004 10.6481 10.8478 10.1812C10.695 9.71365 10.6045 9.15369 10.5127 8.56545L10.5126 8.56445C10.5081 8.53792 10.5037 8.51126 10.4993 8.48449C10.3571 7.6287 10.1955 6.65605 9.75846 5.89126C9.53166 5.49436 9.22924 5.15027 8.81487 4.90598C8.40045 4.66166 7.88033 4.52087 7.22392 4.52087C6.14637 4.52087 5.53815 5.03198 5.22969 5.33766C4.2622 5.58719 3.75817 6.1283 3.49682 6.77944C3.24049 7.41809 3.21981 8.15862 3.20167 8.80799L3.20094 8.83423C3.20094 8.83437 3.20093 8.8345 3.20093 8.83464C3.18236 9.35066 3.16407 9.83443 3.06168 10.2486C2.96036 10.6584 2.77924 10.9889 2.44231 11.2091L2.11541 11.3904L2.02052 11.443L2.08071 11.5333L2.3007 11.8633C2.81691 12.638 3.96456 13.3623 5.15284 13.7087C4.74433 14.862 3.75589 15.2426 2.68054 15.6366C2.04186 15.8551 1.34551 16.0982 0.811165 16.5472C0.269578 17.0023 -0.1 17.6633 -0.1 18.7V19.067V19.167H0H13.933H14.033V19.067V18.7C14.033 17.6633 13.6635 17.0025 13.127 16.5474C12.5975 16.0982 11.9104 15.8547 11.2909 15.6359C11.2749 15.6301 11.2589 15.6242 11.243 15.6184C10.1834 15.2304 9.21975 14.8775 8.81722 13.708C10.0058 13.3617 11.153 12.6373 11.6701 11.8625L11.6702 11.8624L11.8902 11.5324L11.9504 11.4421L11.8555 11.3895L11.528 11.2079ZM12.4139 17.1714C12.7533 17.4178 12.993 17.74 13.0804 18.233H0.885611C0.972968 17.723 1.21322 17.4009 1.55226 17.1586C1.89855 16.9112 2.34679 16.7472 2.85636 16.5607C2.8931 16.5472 2.93015 16.5337 2.96751 16.5199L2.96788 16.5198C2.98244 16.5144 2.99702 16.509 3.01163 16.5036C3.63804 16.2708 4.31282 16.0201 4.88621 15.5843C5.47744 15.135 5.95844 14.4914 6.1837 13.4778L6.18372 13.4778L6.18415 13.4756L6.2572 13.1086L6.27672 13.0106L6.17865 12.991L5.81169 12.918L5.81169 12.918L5.81035 12.9177C4.87991 12.7457 3.88295 12.2082 3.33135 11.6619C3.6876 11.3065 3.87773 10.8643 3.9834 10.3976C4.09456 9.90661 4.1137 9.38087 4.13149 8.89255L4.1321 8.87579H4.13211L4.13214 8.87461C4.1507 8.11936 4.1882 7.52535 4.38069 7.08333C4.47559 6.86543 4.60773 6.68609 4.79419 6.54354C4.98132 6.40047 5.22786 6.29087 5.55633 6.2199L5.55646 6.2205L5.56705 6.21695L5.67705 6.17999L5.69931 6.17251L5.71592 6.15591L5.78896 6.08286L5.78946 6.08236C6.04114 5.83068 6.41967 5.45215 7.22129 5.45215C7.65914 5.45215 7.99995 5.52811 8.27152 5.66848C8.54227 5.80842 8.75076 6.01575 8.91924 6.28932C9.26016 6.84288 9.43195 7.65663 9.6157 8.70564C9.70696 9.27248 9.79964 9.84745 9.95778 10.3682C10.106 10.8563 10.3138 11.3042 10.6385 11.6586C10.0876 12.2059 9.0885 12.7445 8.15607 12.9178L8.15606 12.9177L8.15481 12.918L7.78785 12.991L7.68977 13.0106L7.7093 13.1086L7.78234 13.4756L7.78243 13.476C7.98903 14.491 8.47062 15.1352 9.06674 15.5846C9.63655 16.0142 10.3094 16.2639 10.9286 16.4938C10.952 16.5025 10.9754 16.5112 10.9986 16.5198L10.9991 16.52L11.0071 16.5229C11.5578 16.7247 12.0443 16.903 12.4139 17.1714Z" fill="#DF18FF" stroke="#DF18FF" strokeWidth="0.2" />
      </g>
      <defs>
        <clipPath id="clip0_5_59">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}

export const NpLoan = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.96173 0.399999V16.4118H8.31573V15.2118H3.16173V1.6H9.19993V5.9578H13.3155V9.6538H14.5155V4.9256L10.0881 0.399799L1.96173 0.399999ZM10.3999 2.436L12.6741 4.7578H10.3999V2.436Z" fill="#F55F44" />
      <path d="M4.39381 8.3524H11.604V9.5524H4.39381V8.3524Z" fill="#F55F44" />
      <path d="M4.39381 10.9524H8.004V12.1524H4.39381V10.9524Z" fill="#F55F44" />
      <path d="M18.0382 17.9422V12.4C18.0382 10.7719 14.1922 10.7258 13.7538 10.7258C13.3155 10.7258 9.47179 10.7758 9.47179 12.4V17.9796C9.47257 18.0405 9.48273 18.1007 9.50226 18.1577C9.84366 19.5601 13.3383 19.5999 13.7563 19.5999C14.1743 19.5999 17.9563 19.5522 18.0359 17.9741C18.0359 17.9655 18.0382 17.9562 18.0382 17.9421L18.0382 17.9422ZM16.8382 14.1422C16.5999 14.3617 15.4999 14.7203 13.7562 14.7203C12.0117 14.7203 10.9202 14.3617 10.6718 14.15V13.6344C11.8398 14.0602 13.4718 14.0781 13.7562 14.0781C14.0406 14.0781 15.6718 14.0578 16.8406 13.6344L16.8382 14.1422ZM10.6718 15.4758C11.8398 15.9016 13.4718 15.9196 13.7562 15.9196C14.0406 15.9196 15.6718 15.8992 16.8406 15.4758L16.8398 16C16.5922 16.2117 15.5 16.5703 13.7554 16.5703C12.0117 16.5703 10.9202 16.2 10.6718 16L10.6718 15.4758ZM13.7562 11.9298C15.2562 11.9298 16.2742 12.1954 16.6882 12.404C16.2741 12.604 15.2562 12.8782 13.7562 12.8782C12.2562 12.8782 11.2358 12.6142 10.8242 12.4001C11.2359 12.2001 12.2539 11.9298 13.7562 11.9298ZM10.6718 17.8344V17.318C11.8398 17.7438 13.4718 17.7618 13.7562 17.7618C14.0406 17.7618 15.6718 17.7414 16.8406 17.318V17.8336C16.5898 18.0461 15.5 18.4 13.7562 18.4C12.0117 18.4 10.9202 18.0461 10.6718 17.8344Z" fill="#F55F44" />
    </svg>

  )
}

export const NpMoney = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_5_43)">
        <path d="M16.6002 2.25C16.6002 1.52193 16.0002 0.934328 15.1059 0.534069C14.2049 0.130866 12.9713 -0.1 11.6248 -0.1C10.2786 -0.1 9.0451 0.130867 8.14428 0.534071C7.25004 0.93433 6.64999 1.52193 6.64999 2.25C6.64999 2.97807 7.25004 3.56567 8.14428 3.96593C9.0451 4.36913 10.2786 4.6 11.6248 4.6C12.9713 4.6 14.2049 4.36913 15.1059 3.96593C16.0002 3.56567 16.6002 2.97807 16.6002 2.25ZM7.60023 2.25C7.60023 2.10802 7.68873 1.94724 7.88614 1.78025C8.08165 1.61485 8.37053 1.45542 8.7363 1.31648C9.46698 1.03894 10.4858 0.85024 11.6248 0.85024C12.7637 0.85024 13.7827 1.03894 14.5136 1.31649C14.8794 1.45543 15.1684 1.61487 15.364 1.78027C15.5615 1.94727 15.65 2.10804 15.65 2.25C15.65 2.39196 15.5615 2.55273 15.364 2.71974C15.1684 2.88513 14.8794 3.04457 14.5136 3.18351C13.7827 3.46106 12.7637 3.64976 11.6248 3.64976C10.4858 3.64976 9.46698 3.46106 8.7363 3.18351C8.37053 3.04457 8.08165 2.88514 7.88614 2.71975C7.68873 2.55275 7.60023 2.39198 7.60023 2.25Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M16.6002 2.25V2.15H16.5002H15.75H15.65V2.25V4.5C15.65 4.64197 15.5615 4.80274 15.364 4.96974C15.1684 5.13514 14.8794 5.29458 14.5136 5.43352C13.7827 5.71106 12.7637 5.89976 11.6248 5.89976C10.4858 5.89976 9.46698 5.71106 8.7363 5.43351C8.37053 5.29457 8.08165 5.13514 7.88614 4.96975C7.68873 4.80275 7.60023 4.64198 7.60023 4.5V2.25V2.15H7.50023H6.74999H6.64999V2.25V4.5C6.64999 5.22807 7.25004 5.81567 8.14428 6.21593C9.0451 6.61913 10.2786 6.85 11.6248 6.85C12.9713 6.85 14.2049 6.61913 15.1059 6.21593C16.0002 5.81567 16.6002 5.22807 16.6002 4.5V2.25Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M6.64999 6.75702V6.839L6.73038 6.85508L6.73039 6.85508L6.73836 6.85667L6.74648 6.85696C7.00336 6.86601 7.2532 6.8848 7.49322 6.91194L7.62051 6.92632L7.60358 6.79935C7.60132 6.78245 7.60023 6.76648 7.60023 6.74999V4.49999V4.39999H7.50023H6.74999H6.64999V4.49999V6.74999V6.75702ZM10.5008 8.94543L10.5045 9.0446C10.8651 9.0808 11.2404 9.09995 11.6248 9.09995C12.9713 9.09995 14.2049 8.86908 15.1059 8.46588C16.0002 8.06562 16.6002 7.47802 16.6002 6.74995V4.49995V4.39995H16.5002H15.75H15.65V4.49995V6.74995C15.65 6.89191 15.5615 7.05268 15.364 7.21969C15.1684 7.38509 14.8794 7.54452 14.5136 7.68346C13.7827 7.96101 12.7637 8.14971 11.6248 8.14971C11.2361 8.14971 10.8616 8.12811 10.5068 8.08777L10.3795 8.07328L10.3964 8.20034C10.3987 8.21717 10.3998 8.23385 10.3998 8.24971C10.3998 8.31385 10.4054 8.56946 10.4146 8.94751L10.5008 8.94543Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M10.4708 11.1523L10.3083 11.2762L10.5626 11.3004C10.9055 11.3331 11.2609 11.3501 11.6247 11.3501C12.9712 11.3501 14.2049 11.1192 15.1058 10.716C16.0001 10.3158 16.6002 9.72815 16.6002 9.00008V6.75008V6.65008H16.5002H15.7499H15.6499V6.75008V9.00008C15.6499 9.14205 15.5614 9.30282 15.3639 9.46982C15.1684 9.63522 14.8794 9.79466 14.5135 9.93359C13.7827 10.2111 12.7637 10.3998 11.6247 10.3998C11.257 10.3998 10.9005 10.3803 10.5631 10.3442L10.4495 10.332L10.4525 10.4462C10.4544 10.5217 10.4564 10.5983 10.4584 10.6757C10.4624 10.8315 10.4664 10.9908 10.4708 11.1523ZM7.60023 6.75005V6.65005H7.50023H6.74999H6.64999V6.75005V6.75708V6.8536L6.74645 6.85702C7.00189 6.86606 7.24972 6.88486 7.48926 6.91132L7.49602 6.85005H7.50023V6.81192H7.60023V6.75005Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M11.35 9C11.35 8.27193 10.75 7.68433 9.85574 7.28407C8.95492 6.88087 7.72145 6.65 6.37527 6.65C5.02872 6.65 3.79508 6.88087 2.89417 7.28407C1.99983 7.68433 1.39979 8.27193 1.39979 9C1.39979 9.72807 1.99983 10.3157 2.89417 10.7159C3.79508 11.1191 5.02872 11.35 6.37527 11.35C7.72145 11.35 8.95492 11.1191 9.85574 10.7159C10.75 10.3157 11.35 9.72807 11.35 9ZM2.35003 9C2.35003 8.85803 2.43855 8.69726 2.63603 8.53026C2.83161 8.36486 3.12058 8.20542 3.48644 8.06648C4.21731 7.78894 5.23628 7.60024 6.37527 7.60024C7.51425 7.60024 8.53304 7.78894 9.26372 8.06649C9.62949 8.20543 9.91837 8.36486 10.1139 8.53025C10.3113 8.69725 10.3998 8.85802 10.3998 9C10.3998 9.14198 10.3113 9.30275 10.1139 9.46975C9.91837 9.63514 9.62949 9.79457 9.26372 9.93351C8.53304 10.2111 7.51425 10.3998 6.37527 10.3998C5.23628 10.3998 4.21731 10.2111 3.48644 9.93351C3.12058 9.79457 2.83161 9.63513 2.63603 9.46974C2.43855 9.30273 2.35003 9.14196 2.35003 9Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M11.35 9V8.9H11.25H10.4998H10.3998V9V11.25C10.3998 11.392 10.3113 11.5528 10.1139 11.7198C9.91837 11.8851 9.62949 12.0446 9.26372 12.1835C8.53304 12.4611 7.51425 12.6498 6.37527 12.6498C5.23628 12.6498 4.21731 12.4611 3.48644 12.1835C3.12058 12.0446 2.83161 11.8851 2.63603 11.7197C2.43855 11.5527 2.35003 11.392 2.35003 11.25V9V8.9H2.25003H1.49979H1.39979V9V11.25C1.39979 11.9781 1.99983 12.5657 2.89417 12.9659C3.79508 13.3691 5.02872 13.6 6.37527 13.6C7.72145 13.6 8.95492 13.3691 9.85574 12.9659C10.75 12.5657 11.35 11.9781 11.35 11.25V9Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M11.35 11.25V11.15H11.25H10.4998H10.3998V11.25V13.5C10.3998 13.642 10.3113 13.8028 10.1139 13.9698C9.91837 14.1351 9.62949 14.2946 9.26372 14.4335C8.53304 14.7111 7.51425 14.8998 6.37527 14.8998C5.23628 14.8998 4.21731 14.7111 3.48644 14.4335C3.12058 14.2946 2.83161 14.1351 2.63603 13.9697C2.43855 13.8027 2.35003 13.642 2.35003 13.5V11.25V11.15H2.25003H1.49979H1.39979V11.25V13.5C1.39979 14.2281 1.99983 14.8157 2.89417 15.2159C3.79508 15.6191 5.02872 15.85 6.37527 15.85C7.72145 15.85 8.95492 15.6191 9.85574 15.2159C10.75 14.8157 11.35 14.2281 11.35 13.5V11.25Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M11.35 13.5V13.4H11.25H10.4998H10.3998V13.5V15.75C10.3998 15.892 10.3113 16.0528 10.1139 16.2198C9.91837 16.3851 9.62949 16.5446 9.26372 16.6835C8.53304 16.9611 7.51425 17.1498 6.37527 17.1498C5.23628 17.1498 4.21731 16.9611 3.48644 16.6835C3.12058 16.5446 2.83161 16.3851 2.63603 16.2197C2.43855 16.0527 2.35003 15.892 2.35003 15.75V13.5V13.4H2.25003H1.49979H1.39979V13.5V15.75C1.39979 16.4781 1.99983 17.0657 2.89417 17.4659C3.79508 17.8691 5.02872 18.1 6.37527 18.1C7.72145 18.1 8.95492 17.8691 9.85574 17.4659C10.75 17.0657 11.35 16.4781 11.35 15.75V13.5Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M10.54 13.4958L10.5635 13.5507L10.623 13.556C10.9474 13.5851 11.2822 13.6 11.6247 13.6C12.9713 13.6 14.2049 13.3692 15.1058 12.966C16.0002 12.5657 16.6002 11.9781 16.6002 11.25V9.00004V8.90004H16.5002H15.75H15.65V9.00004V11.25C15.65 11.392 15.5615 11.5528 15.364 11.7198C15.1684 11.8852 14.8794 12.0446 14.5136 12.1836C13.7827 12.4611 12.7637 12.6498 11.6247 12.6498C11.2779 12.6498 10.9423 12.6324 10.6222 12.6004L10.5095 12.5891L10.5123 12.7023C10.5164 12.8718 10.5209 13.0392 10.5252 13.203C10.5275 13.2894 10.5298 13.3749 10.532 13.459L10.5325 13.4782L10.54 13.4958L10.54 13.4958Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
        <path d="M10.5989 15.7457L10.6206 15.8064L10.685 15.8117C10.9893 15.8365 11.3042 15.85 11.6248 15.85C12.9713 15.85 14.2049 15.6191 15.1059 15.2159C16.0002 14.8157 16.6002 14.2281 16.6002 13.5V11.25V11.15H16.5002H15.75H15.65V11.25V13.5C15.65 13.642 15.5615 13.8027 15.364 13.9697C15.1684 14.1351 14.8794 14.2946 14.5136 14.4335C13.7827 14.7111 12.7637 14.8997 11.6248 14.8997C11.2995 14.8997 10.9841 14.8844 10.6821 14.8559L10.5697 14.8453L10.5728 14.9582C10.5779 15.1476 10.5822 15.3097 10.5856 15.4372C10.5892 15.5703 10.5917 15.6657 10.5932 15.7149L10.5936 15.7307L10.5989 15.7456L10.5989 15.7457Z" fill="#FF3366" stroke="#FF3366" strokeWidth="0.2" />
      </g>
      <defs>
        <clipPath id="clip0_5_43">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}