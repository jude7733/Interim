import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";


const TopBar = () => {
  return (
    <div className="flex p-1 items-start">
      <Avatar className="w-9 mr-4">
        <AvatarImage src="../../public/hacker.png" />
      </Avatar>
      <ModeToggle />
    </div>
  );
};

export default TopBar;
