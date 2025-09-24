import BackButton from "@/components/ui/back-button";
import {Badge} from "@/components/ui/badge";
import Loader from "@/components/ui/loader";
import {useTaskByIdQuery} from "@/hooks/use-task";
import {useAuth} from "@/provider/auth-context";
import type {Project, Task} from "@/types";
import React from "react";
import {useNavigate, useParams} from "react-router";
import {motion} from "motion/react";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff} from "lucide-react";
import {cn} from "lib/utils";
import TaskTitle from "@/components/task/task-title";
import {formatDistance, formatDistanceToNow} from "date-fns";
import TaskStatusSelector from "@/components/task/task-status-selector";
import TaskDescription from "@/components/task/task-description";
import TaskAssigneesSelector from "@/components/task/task-assignees-selector";
import TaskPrioritySelector from "@/components/task/task-priority-selector";
import SubTasksDetails from "@/components/task/subtasks-details";
import Watchers from "@/components/task/watchers";
import TaskActivity from "@/components/task/task-activity";

interface Props {}

const TaskDetails: React.FC<Props> = () => {
  const {user} = useAuth();
  const {taskId, projectId, workspaceId} = useParams();
  const navigate = useNavigate();
  const {data, isLoading} = useTaskByIdQuery(taskId!) as {
    data: {task: Task; project: Project};
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

  const {task, project} = data;

  const isUserWatching = task.watchers.some(
    (watcher) => watcher._id.toString() === user?._id.toString()
  );

  const members = task.assignees || [];

  return (
    <div className="container mx-auto p-0 py-4 md:px-4">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        className="flex flex-col md:flex-row items-center justify-between mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center">
          <BackButton />

          <h1 className="text-xl md:text-2xl font-bold">{task.title}</h1>

          {task.isArchived && (
            <Badge className="mx-4 w-fit px-0 md:px-4" variant={"outline"}>
              Archieved
            </Badge>
          )}
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant={"outline"}
            size={"sm"}
            className="mx-4 w-fit"
            onClick={() => {}}
          >
            {isUserWatching ? (
              <>
                <EyeOff className="mr-2 size-4" /> UnWatch
              </>
            ) : (
              <>
                <Eye className="mr-2 size-4" /> Watch
              </>
            )}
          </Button>

          <Button
            className="text-primary hover:text-primary/80"
            variant={"outline"}
          >
            {task.isArchived ? "Unarchive" : "Archive"}
          </Button>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div>
                <Badge
                  className={cn(
                    "mb-2 capitalize",
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-orange-500"
                      : "bg-slate-500"
                  )}
                >
                  {task.priority}
                </Badge>

                <TaskTitle title={task.title} taskId={task._id} />

                <div className="text-sm text-muted-foreground">
                  Created at:{" "}
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <TaskStatusSelector status={task.status} taskId={task._id} />

                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="hidden md:block"
                >
                  Delete task
                </Button>
              </div>
            </div>

            <div className="mb-6 flex gap-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-0">
                Description:
              </h3>

              <TaskDescription
                taskId={task._id}
                description={task.description}
              />
            </div>

            <TaskAssigneesSelector
              task={task}
              assignees={task.assignees}
              projectMembers={project.members}
            />

            <TaskPrioritySelector priority={task.priority} taskId={task._id} />

            <SubTasksDetails subTasks={task.subTasks} taskId={task._id} />
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
          <Watchers watchers={task.watchers} />

          <TaskActivity resourceId={task._id} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
