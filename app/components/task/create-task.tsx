import { useCreateTask } from "@/hooks/use-task";
import { createTaskSchema } from "@/lib/schema";
import type { ProjectMemberRole, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar1Icon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  projectMembers: {
    user: User;
    role: ProjectMemberRole;
  }[];
}

export type CreteTaskFormData = z.infer<typeof createTaskSchema>;

const CreateTaskDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  projectId,
  projectMembers,
}) => {
  console.log(projectMembers);

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      priority: "Low",
      dueDate: "",
      assignees: [],
    },
  });

  const { mutate: createtask, isPending } = useCreateTask();

  const onSubmit = (data: CreteTaskFormData) => {
    createtask(
      {
        projectId,
        taskData: data,
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
          form.reset();
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error + "");
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter task title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            {...field}
                            placeholder="Enter task description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormItem>
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                  <SelectItem value="To Do">To Do</SelectItem>
                                  <SelectItem value="In Progress">
                                    In Progress
                                  </SelectItem>
                                  <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                              </FormItem>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormItem>
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                  <SelectItem value="Low">Low</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                              </FormItem>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <FormField
                  name="dueDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value ? "text-muted-foreground" : ""
                              )}
                            >
                              <Calendar1Icon className="size-4 mr-2" />
                              {field.value ? (
                                format(new Date(field.value), "PP")
                              ) : (
                                <span> Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              className="w-full"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(
                                  date?.toISOString() || undefined
                                );
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignees"
                  render={({ field }) => {
                    const selectedMembers = field.value || [];
                    return (
                      <FormItem>
                        <FormLabel>Assignees</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal min-h-11"
                              >
                                {selectedMembers.length === 0 ? (
                                  <span className="text-muted-foreground">
                                    Select assignees
                                  </span>
                                ) : selectedMembers.length <= 2 ? (
                                  selectedMembers
                                    .map((m) => {
                                      const member = projectMembers.find(
                                        (wm) => wm.user._id === m
                                      );

                                      return `${member?.user.name}`;
                                    })
                                    .join(", ")
                                ) : (
                                  `${selectedMembers.length} assignees selected`
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-sm max-h-60 overflow-y-auto p-2"
                              align="start"
                            >
                              <div className="flex flex-col gap-2">
                                {projectMembers.map((member) => {
                                  const selectedMember = selectedMembers.find(
                                    (m) => m === member.user?._id
                                  );

                                  return (
                                    <div
                                      key={member.user._id}
                                      className="flex items-center gap-2 p-2 border rounded"
                                    >
                                      <Checkbox
                                        checked={!!selectedMember}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...selectedMembers,
                                              member.user._id,
                                            ]);
                                          } else {
                                            field.onChange(
                                              selectedMembers.filter(
                                                (m) => m != member.user._id
                                              )
                                            );
                                          }
                                        }}
                                        id={`member-${member.user._id}`}
                                      />
                                      <span className="truncate flex-1">
                                        {member.user.name}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
