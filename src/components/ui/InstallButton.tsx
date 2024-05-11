import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "./button";
import { Label } from "./label";
import { installPackages } from "@/app/shell";
import { Download, Loader2 } from "lucide-react";
import { pipInstall } from "@/app/pip";
import { clearQueue } from "@/features/queueSlice";
import { clearPipQueue } from "@/features/pipQueueSlice";
import { toast } from "./use-toast";
import { useState } from "react";

const InstallButton = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector((state) => state.queue.value);
  const pipQueue = useAppSelector((state) => state.pip.value);
  const [loading, setLoading] = useState(false);

  const handleInstall = async () => {
    setLoading(true);
    if (queue.length > 0) {
      await installPackages(dispatch, queue)
        .then(() => setLoading(false))
        .finally(() => toast({ description: "Installation completed" }));
      dispatch(clearQueue());
    }
    if (pipQueue.length > 0) {
      await pipInstall(dispatch, pipQueue)
        .then(() => setLoading(false))
        .finally(() => toast({ description: "Pip packages installed" }));
      dispatch(clearPipQueue());
    }
  };

  return (
    <>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Button
          {...(queue.length === 0 &&
            pipQueue.length === 0 && { disabled: true })}
          onClick={handleInstall}
          size="sm"
          className="relative rounded-full"
        >
          <Label className="mr-2">Install</Label>
          <Download size={20} />
          <Label
            className={`${
              queue.length > 0 && "animate-bounce"
            } absolute -bottom-1 -right-2 bg-secondary font-bold text-secondary-foreground rounded-[50%] border-4`}
          >
            {queue.length}
          </Label>
        </Button>
      )}
    </>
  );
};
export default InstallButton;
