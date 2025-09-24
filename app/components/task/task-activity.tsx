import {useGetTaskActivity} from "@/hooks/use-task";
import React from "react";
import Loader from "../ui/loader";
import type {Activity, User} from "@/types";
import {getActionIcon} from "./task-icon";

interface Props {
  resourceId: string;
}

const TaskActivity: React.FC<Props> = ({resourceId}) => {
  const {data, isFetching} = useGetTaskActivity(resourceId) as {
    data: Activity[];
    isFetching: boolean;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm ">
      <h3 className="text-lg text-muted-foreground mb-4">Activity</h3>

      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((activity) => {
            const Icon = getActionIcon(activity.action);
            return (
              <div key={activity._id} className="flex gap-2">
                <div className="size-8  flex items-center justify-center text-primary">
                  <Icon className="size-5 rounded-full" />
                </div>

                <div className="">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    {activity.details.descriptiom}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted-foreground text-sm ">No Activity Found</p>
        )}
      </div>
    </div>
  );
};

export default TaskActivity;
