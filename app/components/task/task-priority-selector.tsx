import {useUpdateTaskPririty} from "@/hooks/use-task";
import type {TaskPriority} from "@/types";
import React from "react";
import {toast} from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  priority: TaskPriority;
  taskId: string;
}

const TaskPrioritySelector: React.FC<Props> = ({taskId, priority}) => {
  const {mutate: updatePriority, isPending} = useUpdateTaskPririty();

  const handlePriorityChange = (priority: TaskPriority) => {
    updatePriority(
      {taskId, priority},
      {
        onSuccess: () => {
          toast.success("Task priority is updated");
        },
        onError: (error) => {
          toast.error(error + "");
        },
      }
    );
  };

  return (
    <div className="mb-6">
      <Select value={priority} onValueChange={handlePriorityChange}>
        <SelectTrigger className="w-[180px] " disabled={isPending}>
          <SelectValue placeholder="Priority" />
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};

export default TaskPrioritySelector;
