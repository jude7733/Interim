import { Button } from "./button";
import { useAppDispatch } from "@/app/hooks";
import { addQueue } from "@/features/queueSlice";
import { Label } from "./label";

const QButton = ({ queue }: { queue: string[] }) => {
  const dispatch = useAppDispatch();
  return (
    <Button onClick={() => dispatch(addQueue(queue))}>
      <Label>Add to queue</Label>
    </Button>
  );
};

export default QButton;
