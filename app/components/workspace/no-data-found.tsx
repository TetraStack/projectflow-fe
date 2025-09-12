import { CirclePlus, LayoutGrid } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

const NoDataFound: React.FC<Props> = ({
  title,
  description,
  buttonText,
  buttonAction,
}) => {
  return (
    <div className="col-span-full text-center py-12 2xl:py-24 bg-muted/40 rounded-lg">
      <LayoutGrid className="size-12 mx-auto text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold"> {title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
      <Button
        variant={"outline"}
        onClick={buttonAction}
        className="mt-4 text-primary border-primary border-2 hover:text-primary/80"
      >
        <CirclePlus className="size-4 " />
        {buttonText}
      </Button>
    </div>
  );
};

export default NoDataFound;
