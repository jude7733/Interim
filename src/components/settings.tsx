import { useAppSelector } from "@/app/hooks";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Head } from "./ui/head";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SettingsCardProps = {
  children: JSX.Element;
  title: string;
  desc: string;
};

const SettingsCard = ({ children, title, desc }: SettingsCardProps) => {
  return (
    <Card className="flex flex-col justify-between px-8 pt-6 mb-7 shadow-sm shadow-primary">
      <CardTitle>{title}</CardTitle>
      <div className="flex mt-5 justify-between">
        <CardDescription>{desc}</CardDescription>
        <CardContent>{children}</CardContent>
      </div>
    </Card>
  );
};

const Settings = () => {
  const settings = useAppSelector((state) => state.settings.value);

  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 gap-5 w-full h-full">
      <Head title="Settings" />

      <ScrollArea className="flex flex-col items-center justify-center w-full px-40">
        <SettingsCard title="Accent color" desc="Choose your color theme">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={settings.accent} />
            </SelectTrigger>
            <SelectContent defaultValue={settings.accent}>
              <SelectItem value="yellow">Yellow</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="red">Red</SelectItem>
            </SelectContent>
          </Select>
        </SettingsCard>
        <SettingsCard title="Auto fetch" desc="Check updates on startup">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={settings.autoFetch} />
            </SelectTrigger>
            <SelectContent defaultValue={settings.autoFetch}>
              <SelectItem value="off">off</SelectItem>
              <SelectItem value="on">on</SelectItem>
            </SelectContent>
          </Select>
        </SettingsCard>
        <SettingsCard
          title="Power options"
          desc="Auto shutdown or Reboot after installation"
        >
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={settings.power} />
            </SelectTrigger>
            <SelectContent defaultValue={settings.power}>
              <SelectItem value="off">Off</SelectItem>
              <SelectItem value="shutdown">Shutdown</SelectItem>
              <SelectItem value="reboot">Reboot</SelectItem>
            </SelectContent>
          </Select>
        </SettingsCard>
      </ScrollArea>
    </div>
  );
};
export default Settings;
