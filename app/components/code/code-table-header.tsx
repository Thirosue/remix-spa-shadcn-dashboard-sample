import { useNavigate } from "@remix-run/react";
import { Heading } from "~/components/ui/heading";
import { Button } from "~/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Icons } from "~/components/icons";

export function CodeTableHeader({
  isPending,
  totalCount,
}: {
  isPending: boolean;
  totalCount: number;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Heading
        title={`Codes (${totalCount})`}
        description="Manage system codes"
      />
      <Button
        onClick={() => navigate("/dashboard/code/new")}
        disabled={isPending}
      >
        {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        <Icons.add className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  );
}
