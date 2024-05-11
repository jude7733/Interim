import { Button } from "./button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addQueue, popQueue } from "@/features/queueSlice";
import { addPipQueue, popPipQueue } from "@/features/pipQueueSlice";
import { Trash2 } from "lucide-react";

type QButtonProps = {
  queue: string[];
  manager?: "pip" | "default";
  varient: "individual" | "icon" | "list";
};
const QButton = ({ queue, manager = "default", varient }: QButtonProps) => {
  const queueList = useAppSelector((state) => state.queue.value);
  const includes = queueList?.includes(queue[0]);
  const dispatch = useAppDispatch();

  const handlePopQueue = () =>
    manager === "default"
      ? dispatch(popQueue(queue[0]))
      : dispatch(popPipQueue(queue[0]));

  return (
    <>
      {varient === "individual" && (
        <Button
          onClick={() =>
            includes ? dispatch(popQueue(queue[0])) : dispatch(addQueue(queue))
          }
          variant={includes ? "destructive" : "default"}
        >
          {includes ? "Remove" : "Add"}
        </Button>
      )}

      {varient === "icon" && includes && (
        <Button onClick={handlePopQueue} size="icon" variant="outline">
          <Trash2 className="h-4 w-4" color="red" />
        </Button>
      )}

      {varient === "list" && (
        <Button
          onClick={() =>
            manager === "default"
              ? dispatch(addQueue(queue))
              : dispatch(addPipQueue(queue))
          }
        >
          Add to queue
        </Button>
      )}
    </>
  );
};

export default QButton;
