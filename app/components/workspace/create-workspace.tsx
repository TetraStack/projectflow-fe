import { colorOptionsForWrokspaces } from "@/constants";
import { workspaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCreateWorkspaceMutation } from "@/hooks/use-workspace";
import { toast } from "sonner";

interface Props {
  isCreatingWorkspace: boolean;
  setIsCreatingWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
}

export type WorkSpaceForm = z.infer<typeof workspaceSchema>;

const CreateWorkspace: React.FC<Props> = ({
  isCreatingWorkspace,
  setIsCreatingWorkspace,
}) => {
  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      color: colorOptionsForWrokspaces[0],
      description: "",
    },
  });

  const { mutate: createWorkspace } = useCreateWorkspaceMutation();

  const onSubmit = (data: WorkSpaceForm) => {
    console.log(data);
    createWorkspace(data, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Workspace is created");
      },
      onError: (error) => toast.error(error + ""),
    });
    setIsCreatingWorkspace(false);
  };
  return (
    <Dialog
      open={isCreatingWorkspace}
      onOpenChange={setIsCreatingWorkspace}
      modal={true}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>Create Workspace</DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="color"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-3 flex-wrap">
                      {colorOptionsForWrokspaces.map((color) => {
                        return (
                          <div
                            key={color}
                            onClick={() => field.onChange(color)}
                            className={cn(
                              "flex items-center justify-center size-6 rounded-full cursor-pointer hover:opacity-80 transition-all duration-300",
                              field.value === color &&
                                "ring-2 ring-offset-2 ring-foreground"
                            )}
                            style={{ backgroundColor: color }}
                          ></div>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
