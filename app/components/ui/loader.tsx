import { Loader2, Loader as LucidLoader } from "lucide-react";

import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen w-full bg-background items-center justify-center">
      <LucidLoader className="size-5 text-primary animate-spin" />
    </div>
  );
};

export default Loader;
