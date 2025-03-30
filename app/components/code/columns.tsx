import { Code } from "~/types";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";

import { CellAction } from "~/components/code/cell-action";

export const columns: ColumnDef<Code>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    enableSorting: false,
  },
  {
    accessorKey: "categoryCode",
    header: "Category Code",
  },
  {
    accessorKey: "codeValue",
    header: "Code",
  },
  {
    accessorKey: "codeName",
    header: "Name",
  },
  {
    accessorKey: "codeAlias",
    header: "Alias",
  },
  {
    accessorKey: "displayOrder",
    header: "Display Order",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
