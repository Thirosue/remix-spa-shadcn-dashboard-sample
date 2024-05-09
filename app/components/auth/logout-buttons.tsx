import * as React from "react";

import { useNavigate } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { useMounted } from "~/hooks/use-mounted";
import { Button, buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Icons } from "~/components/icons";
import { useSession } from "~/components/layout/session-provider";
import { useToast } from "~/components/ui/use-toast";

export function LogOutButtons() {
  const mounted = useMounted();
  const navigate = useNavigate();
  const { clearSession } = useSession();
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  async function onSubmit() {
    try {
      setLoading(true);
      setTimeout(() => {
        clearSession();
        navigate("/auth/signin");
        toast({
          description: "Logged out successfully!",
        });
      }, 1000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <Button
          aria-label="Log out"
          size="sm"
          className="w-full"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Log out
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground",
          )}
        >
          Log out
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => navigate(-1)}
        disabled={loading}
      >
        Go back
      </Button>
    </div>
  );
}
