import type {TaskStatus} from "@/types";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {useTaskStatusMutation} from "@/hooks/use-task";
import {toast} from "sonner";

interface Props {
  status: TaskStatus;
  taskId: string;
}

const TaskStatusSelector: React.FC<Props> = ({status, taskId}) => {
  const {mutate: updateTaskStatus, isPending} = useTaskStatusMutation();

  const handleStatusChange = (value: string) => {
    updateTaskStatus(
      {taskId, taskStatus: value},
      {
        onSuccess: () => toast.success("Task status is updated"),
        onError: (error) => toast.error(error + ""),
      }
    );
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="To Do">Todo</SelectItem>
        <SelectItem value="In Progress">In Progress</SelectItem>
        <SelectItem value="Done">Done</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TaskStatusSelector;
