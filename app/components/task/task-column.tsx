import {cn} from "@/lib/utils";
import type {Task} from "@/types";
import React from "react";
import {Badge} from "../ui/badge";
import {Card, CardContent, CardHeader} from "../ui/card";
import {Button} from "../ui/button";
import {
  AlertCircle,
  Calendar,
  Calendar1,
  Calendar1Icon,
  Check,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {format} from "date-fns";
import {motion, AnimatePresence} from "motion/react";

interface Props {
  title: string;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  isFullWidth?: boolean;
}

const TaskColumn: React.FC<Props> = ({
  title,
  tasks,
  onTaskClick,
  isFullWidth = false,
}) => {
  return (
    <div
      className={cn(
        isFullWidth
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : ""
      )}
    >
      <div
        className={cn(
          "space-y-4  p-2 ",
          !isFullWidth ? "h-full" : "col-span-full mb-4"
        )}
      >
        {!isFullWidth && (
          <div className="flex items-center justify-between ">
            <h1 className="font-medium">{title}</h1>
            <Badge variant={"outline"}>{tasks.length}</Badge>
          </div>
        )}

        <div
          className={cn(
            "space-y-3",
            isFullWidth && "grid grid-cols-2 lg:grid-cols-3 gap-4"
          )}
        >
          {tasks.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground">
              No tasks yet
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => onTaskClick(task._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}
const TaskCard: React.FC<TaskCardProps> = ({task, onClick}) => {
  const MotionCard = motion(Card);
  return (
    <AnimatePresence>
      <MotionCard
        whileTap={{scale: [0.2, 4]}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        onClick={onClick}
        className="cursor-pointer hover:shadow-md transition-all duration-300 "
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge
              className={cn(
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-orange-500"
                  : "bg-slate-500"
              )}
            >
              {task.priority}
            </Badge>

            <div className="flex gap-1 ">
              {task.status !== "To Do" && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="size-6"
                  onClick={() => {}}
                  title="Mark as To Do"
                >
                  <AlertCircle className={cn("size-4")} />
                  <span className="sr-only">Mark as To Do</span>
                </Button>
              )}

              {task.status !== "In Progress" && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="size-6"
                  onClick={() => {}}
                  title="Mark as In Progress"
                >
                  <Clock className={cn("size-4")} />
                  <span className="sr-only">Mark as In Progress</span>
                </Button>
              )}

              {task.status !== "Done" && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="size-6"
                  onClick={() => {}}
                  title="Mark as Done"
                >
                  <CheckCircle2 className={cn("size-4")} />
                  <span className="sr-only">Mark as Done</span>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <h4 className="font-medium mb-2">{task.title}</h4>

          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {task.assignees && task.assignees.length > 0 && (
                <div className="flex -space-x-2">
                  {task.assignees.slice(0, 5).map((member) => (
                    <Avatar
                      key={member._id}
                      className="relative size-8 bg-gray-700 rounded-full border-2 border-background overflow-hidden"
                      title={member.name}
                    >
                      <AvatarImage src={member.profilePicture} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}

                  {task.assignees.length > 5 && (
                    <span className="text-xs text-muted-foreground">
                      + {task.assignees.length - 5}
                    </span>
                  )}
                </div>
              )}
            </div>

            {task.dueDate && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="size-3 mr-1" />
                <span>{format(new Date(task.dueDate), "PP")}</span>
              </div>
            )}
          </div>

          {task.subTasks && task.subTasks.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="text-xs text-muted-foreground">
                {task.subTasks.filter((subtask) => subtask.completed).length}/{" "}
                {task.subTasks.length} subtasks
              </span>
            </div>
          )}
        </CardContent>
      </MotionCard>
    </AnimatePresence>
  );
};

export default TaskColumn;
