import { Skeleton } from "./skeleton";

type LoadingSkeletonProps = { variant: string };
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
    </>
  );
};
