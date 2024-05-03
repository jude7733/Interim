import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";

type BigButtonProps = {
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
};

export const BigButton = ({
  text,
  icon,
  onClick,
  ...props
}: BigButtonProps & React.ComponentProps<typeof Button>) => {
  return (
    <Button
      size="lg"
      variant="outline"
      className="bg-card w-40 h-40 flex-col gap-8 p-5 shadow-primary shadow-md"
      onClick={onClick}
      {...props}
    >
      <Label className="text-lg text-card-foreground">{text}</Label>
      {icon}
    </Button>
  );
};
