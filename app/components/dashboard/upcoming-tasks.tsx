import type {Task} from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {Link} from "react-router";
import {cn} from "lib/utils";
import {CheckCircleIcon, Circle} from "lucide-react";
import {format} from "date-fns";

interface Props {
  data: Task[];
  workspaceId: string;
}

const UpcomingTasks: React.FC<Props> = ({data, workspaceId}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
        <CardDescription>Here are the tasks that are due soon</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No upcoming tasks yet
          </p>
        ) : (
          data.map((task) => {
            return (
              <Link
                key={task._id}
                className="flex items-start space-x-3 border-b pb-3 last:border-0"
                to={`/workspaces/${workspaceId}/projects/${task.project}/task/${task._id}`}
              >
                <div
                  className={cn(
                    "mt-0.5 rounded-full p-2",
                    task.priority === "High" && "bg-red-500",
                    task.priority === "Medium" && "bg-orange-500",
                    task.priority === "Low" && "bg-slate-500"
                  )}
                >
                  {task.status === "Done" ? (
                    <CheckCircleIcon className="size-4" />
                  ) : (
                    <Circle className="size-4" />
                  )}
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{task.status}</span>
                    {task.dueDate && (
                      <>
                        <span className="mx-1">-</span>
                        <span>
                          {format(new Date(task.dueDate), "MMM d,yyyy")}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
