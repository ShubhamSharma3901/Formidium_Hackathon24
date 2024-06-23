import React from "react";
import { Skeleton } from "./skeleton";

function Loader() {
  return (
    <div className="flex items-center justify-evenly">
      <div className="flex items-center justify-evenly gap-6 w-full">
        <Skeleton className="h-11 w-12 rounded-full bg-neutral-600" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-[100%] bg-neutral-600" />
          <Skeleton className="h-4 w-[100%] bg-neutral-600" />
          <Skeleton className="h-4 w-[100%] bg-neutral-600" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
