import { useGetWorkSpaceDetails } from "@/hooks/use-workspace";
import React, { useState } from "react";
import { useParams } from "react-router";

const WorkspaceDetails = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);
  const { data, isLoading } = useGetWorkSpaceDetails(workspaceId!);

  if (!workspaceId) return <div>No workspace found</div>;

  console.log(data);
  return <div>WorkspaceDetails</div>;
};

export default WorkspaceDetails;
