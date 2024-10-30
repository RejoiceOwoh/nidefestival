"use client"

import DashboardOrderTable from "./components/DashboardOrderTable";
import DashboardCard from "./components/DashboardCards";
import AdminLineChart from "./components/AdminLineChart";
import AdminPieChart from "./components/AdminPieChart";



export default function Admin() {
  return (
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 pr-0 lg:pr-4">
          <DashboardCard />
          <DashboardOrderTable />
        </div>

        <div className="w-full lg:w-1/3 mt-4 lg:mt-0 space-y-4">
          <AdminLineChart />
          <AdminPieChart />
        </div>
      </div>
    </div>
  );
}
