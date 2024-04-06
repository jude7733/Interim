import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { os } from "@/app/constants";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import InstallButton from "./ui/InstallButton";
import { useAppSelector } from "@/app/hooks";
import { Login } from "./Login";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const OptionMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TopBar = ({ hideLogin }: { hideLogin: boolean }) => {
  const user = useAppSelector((state) => state.user.value);

  return (
    <div className="bg-accent flex p-1 justify-between items-center border-b-2 border-border">
      <div className="flex justify-start items-center">
        <Avatar className="w-9 mr-4">
          <AvatarImage src="./hacker.png" />
        </Avatar>
        {!hideLogin &&
          (user?.email ? (
            <Badge variant="secondary" className="font-normal text-sm">
              {(user as { email: string })?.email}
            </Badge>
          ) : (
            <Dialog>
              <DialogTrigger>
                <Button variant="secondary">Login</Button>
              </DialogTrigger>
              <DialogContent className="w-fit p-0">
                <Login />
              </DialogContent>
            </Dialog>
          ))}
      </div>
      <div className="flex items-center gap-5">
        <InstallButton />
        <Badge variant="outline">
          <Label className="font-semibold">{os}</Label>
        </Badge>
        <div className="flex items-center gap-1">
          <OptionMenu />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
