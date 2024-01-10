import { ModeToggle } from "@/components/mode-toggle";
import { Avatar } from "@radix-ui/react-avatar";

const TopBar = () => {
  return (
    <div className="flex flex-col p-1 items-end">
      <Avatar />
      <ModeToggle />
    </div>
  );
};

export default TopBar;
