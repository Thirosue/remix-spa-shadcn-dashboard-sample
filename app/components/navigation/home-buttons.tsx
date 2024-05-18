import * as React from "react";

import { useNavigate } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { useMounted } from "~/hooks/use-mounted";
import { Button, buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export function HomeButtons() {
  const mounted = useMounted();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/dashboard/home");
  };

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <Button
          aria-label="Log out"
          size="sm"
          className="w-full"
          onClick={handleHome}
        >
          Go Home
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground",
          )}
        >
          Go Home
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </div>
  );
}
