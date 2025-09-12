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
      <span className="capitalize  flex items-center text-xs font-medium text-background ">
        {name[0]}
      </span>
    </div>
  );
};

export default WorkspaceAvatar;
