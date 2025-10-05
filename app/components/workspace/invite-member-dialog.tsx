import type {User} from "@/types";
import React, {useRef, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "../ui/dialog";
import type z from "zod";
import {inviteMemberSchema} from "@/lib/schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {cn} from "lib/utils";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";
import {Label} from "../ui/label";
import {Spinner} from "../ui/spinner";
import {Check, Copy, MailIcon, SendIcon} from "lucide-react";
import {FloatingLabelInput} from "../ui/floating-lable-input";
import {toast} from "sonner";
import {useInviteMemberMutation} from "@/hooks/use-workspace";

interface Props {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  workspaceId: string;
  workspaceMembers: {
    _id: string;
    user: User;
    role: "admin" | "member" | "owner" | "viewer";
    joinedAt: Date;
  }[];
}

const ROLES = ["admin", "member", "viewer"] as const;

let isSubmmiting = false;

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;

const InviteMemberDialog: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  workspaceId,
  workspaceMembers,
}) => {
  const [inviteTab, setInviteTab] = useState("email");
  const [linkCopied, setLinkCopied] = useState(false);
  const urlInput = useRef<HTMLInputElement>(null);
  const form = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const {mutate, isPending} = useInviteMemberMutation();

  const onSubmit = (data: InviteMemberFormData) => {
    if (!workspaceId) return;

    mutate(
      {workspaceId, ...data},
      {
        onSuccess: () => {
          toast.success("Invite sent successfully");
          form.reset();
          onOpenChange(false);
        },
        onError: (error) => toast.error("" + error),
      }
    );
  };

  const handleCopyInviteLink = () => {
    if (!urlInput.current) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/workspace-invite/${workspaceId}`
    );
    toast.success("Copied");
    urlInput.current.select();

    setLinkCopied(true);

    setTimeout(() => {
      setLinkCopied(false);
      urlInput.current?.blur();
      window.getSelection()?.removeAllRanges();
    }, 2000);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Workspace</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="email"
          value={inviteTab}
          onValueChange={setInviteTab}
        >
          <TabsList aria-disabled={isPending}>
            <TabsTrigger value="email">Send Email</TabsTrigger>
            <TabsTrigger value="link">Share Link</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-4">
            <div className="grid gap-4 ">
              <div className="grid gap-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex flex-col space-y-6 w-full">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                          <FormItem>
                            <FormControl>
                              <FloatingLabelInput label="Email" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Select Role</FormLabel>
                              <FormControl>
                                <RadioGroup defaultValue={field.value}>
                                  <div className="flex items-center gap-3 capitalize">
                                    {ROLES.map((role) => {
                                      return (
                                        <>
                                          <RadioGroupItem
                                            value={role}
                                            id={role}
                                          />
                                          <Label htmlFor={role}>{role}</Label>
                                        </>
                                      );
                                    })}
                                  </div>
                                </RadioGroup>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <Button disabled={isPending}>
                        {isPending ? <Spinner /> : <MailIcon />}
                        Send
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="link" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Share this link to invite people</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    ref={urlInput}
                    readOnly
                    value={`${window.location.origin}/workspace-invite/${workspaceId}`}
                  />

                  <Button onClick={handleCopyInviteLink} disabled={isPending}>
                    {linkCopied ? (
                      <>
                        <Check className="size-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Anyone with the link can join this workspace
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
