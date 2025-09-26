import StateCard from "@/components/dashboard/state-card";
import StatisticsCharts from "@/components/dashboard/statistics-charts";
import Loader from "@/components/ui/loader";
import {useDashBoardData} from "@/hooks/use-workspace";
import type {DashboardData, Project, StateCardProps, Task} from "@/types";
import React from "react";
import {useSearchParams} from "react-router";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const {data, isPending} = useDashBoardData(workspaceId!) as {
    data: DashboardData;
    isPending: boolean;
  };

  if (isPending)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="space-y-8 2xl:space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {data && (
        <>
          <StateCard data={data?.stats} />

          <StatisticsCharts
            stats={data?.stats}
            taskTrendsData={data?.taskTrendsData}
            projectStatusData={data?.projectStatusData}
            taskPriorityData={data?.taskPriorityData}
            workspaceProductivityData={data?.workspaceProductivityData}
            upcomingTasks={data?.upcomingTasks}
            recentProjects={data?.recentProjects}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
