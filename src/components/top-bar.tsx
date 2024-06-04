import { ModeToggle } from "@/components/mode-toggle";
import { os } from "@/app/constants";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import InstallButton from "./ui/InstallButton";
import { Login } from "./Login";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { OptionMenu } from "./OptionMenu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { auth } from "@/app/firebase";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/app/hooks";
import { removeUser } from "@/features/userSlice";

type TopBarProps = {
  hideLogin: boolean;
  email: string;
};

const TopBar = ({ hideLogin, email }: TopBarProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleLogout = async () => {
  await auth.signOut()
      .then(() => dispatch(removeUser()))
      .finally(() => (
      toast({
        description: "Logged out successfully",
      })
    ))
};

  return (
    <div className="bg-accent flex p-1 justify-between items-center border-b-2 border-border">
      <div className="flex justify-start items-center">
        <Avatar className="w-9 mr-4">
          <AvatarImage src="./hacker.png" />
        </Avatar>
        {!hideLogin &&
          (email ? (
            <HoverCard>
              <HoverCardTrigger>
                <Badge variant="secondary" className="font-normal text-sm">
                  {email}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="p-4">
                  <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                </div>
              </HoverCardContent>
            </HoverCard>
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
