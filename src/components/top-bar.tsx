import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

const OptionMenu = () => {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
};

const TopBar = () => {
  return (
    <div className="flex p-1 justify-between">
      <Avatar className="w-9 mr-4">
        <AvatarImage src="./hacker.png" />
      </Avatar>
      <div className="flex items-center gap-1">
        <OptionMenu />
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
