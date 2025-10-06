import Loader from "@/components/ui/loader";
import WorkspaceHeader from "@/components/workspace/workspace-header";
import {useGetWorkspaceProjects} from "@/hooks/use-workspace";
import type {Project, Workspace} from "@/types";
import React, {useState} from "react";
import {useParams} from "react-router";
import ProjectList from "../projects/project-list";
import CreateWorkspace from "@/components/workspace/create-workspace";
import CreateProject from "@/components/workspace/create-project";
import InviteMemberDialog from "@/components/workspace/invite-member-dialog";

const WorkspaceDetails = () => {
  const {workspaceId} = useParams<{workspaceId: string}>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);

  const {data, isLoading} = useGetWorkspaceProjects(workspaceId!) as {
    data: {
      workspace: Workspace;
      projects: Project[];
    };
    isLoading: boolean;
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!workspaceId) return <div>No workspace found</div>;

  return (
    <div className="space-y-8">
      <WorkspaceHeader
        workspace={data.workspace}
        members={data.workspace?.members}
        onCreateProject={setIsCreateProject}
        onInviteMember={setIsInviteMember}
      />

      <ProjectList
        projects={data.projects}
        workspaceId={workspaceId}
        onCreateProject={setIsCreateProject}
      />

      <CreateProject
        workspaceId={workspaceId}
        isCreatingProject={isCreateProject}
        setIsCreatingProject={setIsCreateProject}
        workspaceMembers={data.workspace?.members}
      />

      <InviteMemberDialog
        isOpen={isInviteMember}
        onOpenChange={setIsInviteMember}
        workspaceId={workspaceId}
        workspaceMembers={data.workspace?.members}
      />
    </div>
  );
};

export default WorkspaceDetails;
