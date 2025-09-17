import React from "react";
import { useNavigate } from "react-router";
import { Button } from "./button";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      onClick={() => navigate(-1)}
      className="p-4 mr-1 max-w-20"
    >
      ← Back
    </Button>
  );
};

export default BackButton;
