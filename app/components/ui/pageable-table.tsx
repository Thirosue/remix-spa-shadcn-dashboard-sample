import React from "react";
import { useNavigate, useLocation } from "@remix-run/react";
import { PageSearchFormValues } from "~/types";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function parseSortQueryParam(query: string | undefined) {
  if (!query) {
    return [];
  }
  const decoded = decodeURIComponent(query);
  const [field, order] = decoded.split(":");

  const isDesc = order === "desc";
  return [{ id: field, desc: isDesc }];
}

export interface PageableTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageNo: number;
  pageSizeOptions?: number[];
  initailSort?: SortingState;
  pageCount: number;
  totalCount: number;
}

export function PageableTable<TData, TValue>({
  columns,
  data,
  pageNo,
  totalCount,
  initailSort = [],
  pageCount,
  pageSizeOptions = [5, 10, 20, 50],
}: PageableTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Search params
  const page = searchParams.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams.get("limit") ?? "5";
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 5 : perPageAsNumber;

  /* this can be used to get the selectedrows 
  console.log("value", table.getFilteredSelectedRowModel()); */

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(location.search);

      for (const [key, value] of Object.entries(params)) {
        if (!value) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [location.search],
  );

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });

  const [sorting, setSorting] = React.useState<SortingState>(initailSort);

  React.useEffect(() => {
    const queryObject = {
      page: pageIndex + 1,
      limit: pageSize,
      sort: undefined,
    } as PageSearchFormValues;

    if (sorting && sorting.length > 0) {
      queryObject.sort = sorting
        .map((sort) => `${sort.id}:${sort.desc ? "desc" : "asc"}`)
        .join(",");
    }

    const queryString = createQueryString(queryObject);
    const newUrl = `${location.pathname}?${queryString}`;

    if (`${window.location.pathname}${window.location.search}` !== newUrl) {
      navigate(`${location.pathname}?${queryString}`);
    }
  }, [sorting, pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true, //use pre-sorted row model instead of sorted row model
  });

  const startRow = pageIndex * pageSize + 1;
  const endRow = startRow + table.getFilteredRowModel().rows.length - 1;

  return (
    <>
      <ScrollArea className="h-[calc(50vh-220px)] rounded-md border">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <div
                        className="flex items-center"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {{
                          asc: <TriangleUpIcon />,
                          desc: <TriangleDownIcon />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {startRow}-{endRow} of {totalCount} rows.
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                Rows per page
              </p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
