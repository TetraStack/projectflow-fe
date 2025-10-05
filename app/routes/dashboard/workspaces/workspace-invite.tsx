import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import {Spinner} from "@/components/ui/spinner";
import WorkspaceAvatar from "@/components/workspace/workspace-avatar";
import {
  useAcceptGenerateInviteMutation,
  useAcceptInviteByTokenMutation,
  useGetWorkSpaceDetails,
  useInviteMemberMutation,
} from "@/hooks/use-workspace";
import type {Workspace} from "@/types";
import React from "react";
import {useNavigate, useParams, useSearchParams} from "react-router";
import {toast} from "sonner";

interface Props {}

const WorkspaceInvite: React.FC<Props> = () => {
  const {workspaceId} = useParams();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("tk");

  const navigate = useNavigate();

  if (!workspaceId) return <div className="h-screen">Workspace not found</div>;

  const {data: workspace, isLoading} = useGetWorkSpaceDetails(workspaceId) as {
    data: Workspace;
    isLoading: boolean;
  };

  const {mutate: acceptInviteByToken, isPending: isAcceptInviteByTokenPending} =
    useAcceptInviteByTokenMutation();
  const {
    mutate: acceptGenerateInvite,
    isPending: isAcceptGenerateInvitePending,
  } = useAcceptGenerateInviteMutation();

  const handleAcceptInvite = () => {
    if (!workspaceId) return;

    if (token) {
      acceptInviteByToken(token, {
        onSuccess: () => {
          toast.success("Invation accepted");
          navigate(`/workspaces/${workspaceId}`);
        },
        onError: (error) => toast.error("" + error),
      });
    } else {
      acceptGenerateInvite(workspaceId, {
        onSuccess: () => {
          toast.success("Invation accepted");
          navigate(`/workspaces/${workspaceId}`);
        },
        onError: (error) => toast.error("" + error),
      });
    }
  };
  const handleDeclineInvite = () => {
    toast.info("Invite Declined");
    navigate("/workspaces");
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <WorkspaceAvatar name={workspace.name} color={workspace.color} />
            <CardTitle>{workspace.name}</CardTitle>
          </div>
          <CardDescription>
            You've been invited to join the{" "}
            <span className="text-primary">
              <strong>{workspace.name}</strong>
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {workspace.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {workspace.description}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleAcceptInvite}
              className="flex-1 text-green-500"
              variant={"outline"}
              disabled={
                isAcceptInviteByTokenPending || isAcceptGenerateInvitePending
              }
            >
              {(isAcceptInviteByTokenPending ||
                isAcceptGenerateInvitePending) && <Spinner />}

              {isAcceptInviteByTokenPending || isAcceptGenerateInvitePending
                ? "Joining....."
                : "Accept Invitation"}
            </Button>

            <Button
              className="flex-1"
              disabled={
                isAcceptInviteByTokenPending || isAcceptGenerateInvitePending
              }
              onClick={handleDeclineInvite}
              variant={"destructive"}
            >
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceInvite;
