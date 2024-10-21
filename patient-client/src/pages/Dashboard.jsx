import Notifications from "@/components/Notifications";
import Sidebar from "@/components/Sidebar";
import Cards from "@/sections/Dashboard/Cards";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar className=""/>
      <div className="w-[90%] ml-[10%] pt-10">
        <Cards />
      </div>
      <Notifications />
    </div>
  );
};

export default Dashboard;
