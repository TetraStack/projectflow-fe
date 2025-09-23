import type {ProjectMemberRole, Task, User} from "@/types";
import React, {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Button} from "../ui/button";
import {Checkbox} from "../ui/checkbox";
import {useUpdateTaskAssigneesMutation} from "@/hooks/use-task";
import {toast} from "sonner";

interface Props {
  task: Task;
  assignees: User[];
  projectMembers: {
    user: User;
    role: ProjectMemberRole;
  }[];
}

const TaskAssigneesSelector: React.FC<Props> = ({
  task,
  assignees,
  projectMembers,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    assignees.map((assignee) => assignee._id)
  );

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const {mutate: updateAssignees, isPending} = useUpdateTaskAssigneesMutation();

  const handleSelectAll = () => {
    const allIds = projectMembers.map((m) => m.user._id);

    setSelectedIds(allIds);
  };

  const handleSelect = (id: string) => {
    const isSelected = selectedIds.includes(id);

    if (isSelected) {
      setSelectedIds(selectedIds.filter((selected) => selected != id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleUnSelectAll = () => {
    setSelectedIds([]);
  };

  const handleSave = () => {
    updateAssignees(
      {assignees: selectedIds, taskId: task._id},
      {
        onSuccess: () => {
          setDropDownOpen(false);
          toast.success("Task assignees is updated");
        },
        onError: (error) => {
          toast.error(error + "");
        },
      }
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        Assignees:
      </h3>

      <div className="flex flex-wrap gap-2 mb-2">
        {selectedIds.length === 0 ? (
          <span className="text-sm text-muted-foreground">Unassigned</span>
        ) : (
          projectMembers
            .filter((member) => selectedIds.includes(member.user._id))
            .map((m) => {
              return (
                <div
                  key={m.user._id}
                  className="flex items-center bg-foreground/10 rounded px-2 py-1 "
                >
                  <Avatar className="size-6 mr-1">
                    <AvatarImage src={m.user.profilePicture} />
                    <AvatarFallback>{m.user.name.charAt(0)} </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {m.user.name}
                  </span>
                </div>
              );
            })
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setDropDownOpen(!dropDownOpen)}
          className="text-sm text-muted-foreground w-full border rounded px-3 text-start py-1"
        >
          {setSelectedIds.length === 0
            ? "Seelct assignees"
            : `${selectedIds.length} selected`}
        </button>

        {dropDownOpen && (
          <div className="absolute z-10 mt-2 w-full border rounded shadow-lg max-h-60 overflow-y-auto">
            <div className="flex justify-between px-2 py-1 border-b">
              <button
                className="text-xs text-blue-600"
                onClick={handleSelectAll}
              >
                Select All
              </button>

              <button
                className="text-xs text-red-600"
                onClick={handleUnSelectAll}
              >
                UnSelect All
              </button>
            </div>

            {projectMembers.map((m) => (
              <label
                key={m.user._id}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-foreground/10"
              >
                <Checkbox
                  checked={selectedIds.includes(m.user._id)}
                  onCheckedChange={() => handleSelect(m.user._id)}
                  className="mr-2 border"
                />
                <Avatar className="size-6 mr-1">
                  <AvatarImage src={m.user.profilePicture} />
                  <AvatarFallback>{m.user.name.charAt(0)} </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {m.user.name}
                </span>
              </label>
            ))}

            <div className="flex justify-between px-2 py-1">
              <Button
                variant={"outline"}
                size="sm"
                className="font-light"
                disabled={isPending}
                onClickCapture={() => setDropDownOpen(false)}
              >
                Cancel
              </Button>

              <Button
                size="sm"
                className="font-light"
                disabled={isPending}
                onClickCapture={() => handleSave()}
              >
                {isPending ? "Saving" : "Save"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskAssigneesSelector;
