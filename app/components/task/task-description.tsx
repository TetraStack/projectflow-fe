import {useTaskDescriptionMutation} from "@/hooks/use-task";
import React, {useState} from "react";
import {toast} from "sonner";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import {Edit} from "lucide-react";

interface Props {
  taskId: string;
  description?: string;
}

const TaskDescription: React.FC<Props> = ({taskId, description}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const {mutate: updateDescription, isPending} = useTaskDescriptionMutation();

  const handleDescriptionChange = () => {
    if (!newDescription) return;
    setIsEditing(false);
    updateDescription(
      {description: newDescription, taskId},
      {
        onSuccess: () => {
          toast.success("Description has been updated");
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
        <Textarea
          disabled={isPending}
          className="!text-sm  w-full min-w-3xl"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      ) : (
        <h2 className="text-sm text-pretty flex-1 text-muted-foreground">
          {description}
        </h2>
      )}

      {isEditing ? (
        <>
          <Button
            onClick={handleDescriptionChange}
            className="py-0 "
            size={"sm"}
            disabled={isPending}
          >
            Save
          </Button>

          <Button
            onClick={() => setIsEditing(false)}
            className="py-0 "
            size={"sm"}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Edit
          className="size-3 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default TaskDescription;
