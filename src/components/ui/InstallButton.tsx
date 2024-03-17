import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "./button";
import { Label } from "./label";
import { installPackages } from "@/app/shell";
import { Download } from "lucide-react";

const InstallButton = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector((state) => state.queue.value);
  return (
    <Button
      {...(queue.length === 0 && { disabled: true })}
      onClick={() => installPackages(dispatch, queue)}
      size="sm"
      className="relative rounded-full"
    >
      <Label className="mr-2">Install</Label>
      <Download size={20} />
      <Label className={`${queue.length > 0 && "animate-bounce"} absolute -bottom-1 -right-2 bg-secondary font-bold text-secondary-foreground rounded-[50%] border-4`}>
        {queue.length}
      </Label>
    </Button>
  );
};
export default InstallButton;
