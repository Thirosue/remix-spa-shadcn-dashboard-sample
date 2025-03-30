import { useNavigate } from "@remix-run/react";
import { Heading } from "~/components/ui/heading";
import { Button } from "~/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Icons } from "~/components/icons";

export function CodeCategoryTableHeader({
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
        title={`Code Categories (${totalCount})`}
        description="Manage system code categories"
      />
      <Button
        onClick={() => navigate("/dashboard/code-category/new")}
        disabled={isPending}
      >
        {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        <Icons.add className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  );
}
