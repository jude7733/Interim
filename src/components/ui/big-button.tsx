import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";

export const BigButton = ({
  text,
  icon,
  onClick = () => {},
}: {
  text: string;
  icon: any;
  onClick: any;
}) => {
  return (
    <Button
      size="lg"
      variant="outline"
      className="bg-card w-40 h-40 flex-col gap-8 p-5 shadow-primary shadow-md"
      onClick={onClick}
    >
      <Label className="text-lg text-card-foreground">{text}</Label>
      {icon}
    </Button>
  );
};
