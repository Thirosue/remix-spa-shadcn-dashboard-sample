import { Link } from "@remix-run/react";
import { Plus } from "lucide-react";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";

interface ProductTableHeaderProps {
  totalCount: number;
  isPending: boolean;
}

export function ProductTableHeader({
  isPending,
  totalCount,
}: ProductTableHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <Heading
        title={`Products (${isPending ? 0 : totalCount})`}
        description="Manage products (Server side table functionalities.)"
      />

      <Link
        to={"/dashboard/product/new"}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Link>
    </div>
  );
}
