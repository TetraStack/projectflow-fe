import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/loader";
import { useTaskByIdQuery } from "@/hooks/use-task";
import { useAuth } from "@/provider/auth-context";
import type { Project, Task } from "@/types";
import React from "react";
import { useNavigate, useParams } from "react-router";

interface Props {}

const TaskDetails: React.FC<Props> = () => {
  const { user } = useAuth();
  const { taskId, projectId, workspaceId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useTaskByIdQuery(taskId!) as {
    data: { task: Task; project: Project };
    isLoading: boolean;
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold">Task not found</div>
      </div>
    );
  }

  const { task, project } = data;

  const isUserWatching = task.watchers.some(
    (watcher) => watcher._id.toString() === user?._id.toString()
  );

  const goBack = () => navigate(-1);

  const members = task.assignees || [];

  return (
    <div className="container mx-auto p-0 py-4 md:px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <BackButton />

          <h1 className="text-xl md:text-2xl font-bold">{task.title}</h1>

          {true && (
            <Badge className="mx-4 w-fit px-0 md:px-4" variant={"outline"}>
              Archieved
            </Badge>
          )}
        </div>
      </div>
      TaskDetails
    </div>
  );
};

export default TaskDetails;
