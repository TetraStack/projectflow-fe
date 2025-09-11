import React from "react";

interface Props {
  color: string;
  name: string;
}

const WorkspaceAvatar: React.FC<Props> = ({ color, name }) => {
  return (
    <div
      className="size-6 rounded flex item-center justify-center"
      style={{
        backgroundColor: color,
      }}
    >
      <span className="capitalize text-xs font-medium text-foreground">
        {name}
      </span>
    </div>
  );
};

export default WorkspaceAvatar;
