import Meta from "@/components/Meta";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";
import { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
}

const DashboardLayout = ({ children }: Props): ReactElement => {
  return (
    <div className="wrapper w-full ">
      <Meta title={"lendsqr assessment - dashboard"} />
      <Header />
      <div className="flex relative">
        <SideNav />
        {children}
      </div>
    </div>

  );
};


export default DashboardLayout;
