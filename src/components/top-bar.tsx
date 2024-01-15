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
    <div className="mr-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const TopBar = () => {
  return (
    <div className="flex p-1 justify-between">
      <Avatar className="w-9 mr-4">
        <AvatarImage src="./hacker.png" />
      </Avatar>
      <div className="flex items-center">
        <OptionMenu />
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
