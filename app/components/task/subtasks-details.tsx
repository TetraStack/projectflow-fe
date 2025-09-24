import type {SubTask} from "@/types";
import React, {useState} from "react";
import {Checkbox} from "../ui/checkbox";
import {cn} from "lib/utils";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {useAddSubTask, useUpdateSubTask} from "@/hooks/use-task";
import {toast} from "sonner";

interface Props {
  subTasks: SubTask[];
  taskId: string;
}

const SubTasksDetails: React.FC<Props> = ({subTasks, taskId}) => {
  const [newSubTask, setNewSubTask] = useState("");
  const {mutate: addSubTask, isPending} = useAddSubTask();
  const {mutate: updatedSubTask, isPending: isUpdating} = useUpdateSubTask();

  const handleToggleTask = (subTaskId: string, checked: boolean) => {
    updatedSubTask(
      {taskId, subTaskId, completed: checked},
      {
        onSuccess: () => toast.success("SubTask is updated"),
        onError: (error) => toast.error(error + ""),
      }
    );
  };

  const handleAddSubTask = () => {
    addSubTask(
      {taskId, title: newSubTask},
      {
        onSuccess: () => {
          toast.success("SubTask is added"), setNewSubTask("");
        },
        onError: (error) => toast.error(error + ""),
      }
    );
  };

  return (
    <div className="mb-6 ">
      <h3 className="text-sm font-medium text-muted-foreground mb-0">
        Sub Tasks:
      </h3>

      <div className="space-y-2 mb-4">
        {subTasks.length > 0 ? (
          subTasks.map((subtask) => (
            <div key={subtask._id} className="flex items-center space-x-2">
              <Checkbox
                id={subtask._id}
                checked={subtask.completed}
                onCheckedChange={(checked) =>
                  handleToggleTask(subtask._id, !!checked)
                }
              />
              <label
                className={cn(
                  "text-sm",
                  subtask.completed ? "line-through text-muted-foreground" : ""
                )}
              >
                {subtask.title}
              </label>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">No sub tasks</div>
        )}
      </div>

      <div className="flex">
        <Input
          placeholder="add a sub task"
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
          className="mr-1"
        />
        <Button onClick={handleAddSubTask} disabled={isPending}>
          {isPending ? "Adding..." : "Add Subtask"}
        </Button>
      </div>
    </div>
  );
};

export default SubTasksDetails;
