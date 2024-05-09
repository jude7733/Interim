import { Skeleton } from "./skeleton";
import { TableCell, TableRow } from "./table";

const TableRowSkeleton = () => {
  const TableCellSkeleton = () => (
    <TableCell>
      <Skeleton className="h-6 w-full" />
    </TableCell>
  );
  return (
    <TableRow>
      <TableCellSkeleton />
      <TableCellSkeleton />
      <TableCellSkeleton />
      <TableCellSkeleton />
      <TableCellSkeleton />
      <TableCellSkeleton />
    </TableRow>
  );
};

type LoadingSkeletonProps = {
  variant: "export" | "update" | "search" | "details";
};
export const LoadingSkeleton = ({ variant }: LoadingSkeletonProps) => {
  return (
    <>
      {variant === "export" && (
        <div className="flex flex-col items-center gap-8 w-auto px-[19px] py-7">
          <div className="flex justify-start w-full">
            <Skeleton className="h-8 w-60 rounded-xl" />
          </div>
          <div className="space-y-3 w-min">
            <Skeleton className="h-6 w-72 rounded-xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
          </div>
          <div className="flex w-80 justify-end gap-4">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
      )}
      {variant === "update" && (
        <div className="space-y-3">
          <div className="flex justify-start w-full">
            <Skeleton className="h-6 w-40 rounded-xl" />
          </div>
          <div className="space-y-3 w-min p-5">
            <Skeleton className="h-5 w-72 rounded-xl" />
            <Skeleton className="h-5 w-72 rounded-xl" />
            <Skeleton className="h-5 w-72 rounded-xl" />
          </div>
        </div>
      )}
      {variant === "search" && (
        <>
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </>
      )}
      {variant === "details" && (
        <>
          <div className="p-10 px-[15%] flex justify-between">
            <div className="flex flex-col">
              <Skeleton className="h-7 w-40 rounded-xl" />
              <Skeleton className="h-7 w-80 rounded-xl" />
            </div>
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          <div className="mx-[15%] border-t border-t-primary rounded-lg">
            <Skeleton className="w-full h-96" />
          </div>
          <div className="py-10 mr-[14%] flex justify-end gap-3">
            <Skeleton className="w-16 h-8" />
            <Skeleton className="w-16 h-8" />
          </div>
        </>
      )}
    </>
  );
};
