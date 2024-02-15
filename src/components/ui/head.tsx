import { Label } from "@radix-ui/react-dropdown-menu";

export const Head = ({ title }: { title: string }) => {
  return (
    <div className="mb-4 p-2 rounded-lg w-fit border-b-yellow-400 border-b-2">
      <Label className="text-2xl">{title}</Label>
    </div>
  );
};
