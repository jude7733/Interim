import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "./button";
import { Label } from "./label";
import { installPackages } from "@/app/shell";

const InstallButton = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector((state) => state.queue.value);
  return (
    <Button
      {...(queue.length === 0 && { disabled: true })}
      onClick={() => installPackages(dispatch, queue)}
      size="sm"
    >
      <Label className="font-semibold">Install</Label>
    </Button>
  );
};
export default InstallButton;
