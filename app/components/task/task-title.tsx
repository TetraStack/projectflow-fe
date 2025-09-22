import React, {useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {Edit} from "lucide-react";
import {useTaskTitleMutation} from "@/hooks/use-task";
import {toast} from "sonner";

interface Props {
  title: string;
  taskId: string;
}

const TaskTitle: React.FC<Props> = ({title, taskId}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const {mutate: updateTitle, isPending} = useTaskTitleMutation();

  const handleTitleChange = () => {
    setIsEditing(false);
    updateTitle(
      {title: newTitle, taskId},
      {
        onSuccess: () => {
          toast.success("Title has been updated");
        },
        onError: (error) => {
          toast.error(error + "");
        },
      }
    );
  };
  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <Input
          disabled={isPending}
          className="!text-xl font-semibold w-full min-w-3xl"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <h2 className="text-xl flex-1 font-semibold">{title}</h2>
      )}

      {isEditing ? (
        <Button
          onClick={handleTitleChange}
          className="py-0 "
          size={"sm"}
          disabled={isPending}
        >
          Save
        </Button>
      ) : (
        <Edit
          className="size-3 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default TaskTitle;
