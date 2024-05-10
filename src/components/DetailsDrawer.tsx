import { Info } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useState } from "react";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { getPackageDetails, PackageDetails } from "@/app/shell";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

type DetailsDrawerProps = {
  pkg: string;
  trigger: JSX.Element;
};
const DetailsDrawer = ({ pkg, trigger }: DetailsDrawerProps) => {
  const [details, setDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    await getPackageDetails(pkg).then((data) => {
      setDetails(data as unknown as PackageDetails);
      setLoading(false);
    });
  };
  const detailsList = [
    { name: "Version", value: details?.Version },
    { name: "Origin", value: details?.Origin },
    { name: "Maintainer", value: details?.Maintainer },
    { name: "Download-Size", value: details?.DownloadSize },
    { name: "Install-Size", value: details?.InstalledSize },
    { name: "Home-page", value: details?.Homepage },
    { name: "Section", value: details?.Section },
    {
      name: "Provides",
      value:
        details?.Provides?.length ?? 0 > 85
          ? details?.Provides?.slice(0, 85) + "..."
          : details?.Provides,
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline" onClick={handleFetch}>
          {trigger}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {loading ? (
          <LoadingSkeleton variant="details" />
        ) : (
          <>
            <DrawerHeader className="p-10 px-[15%]">
              <DrawerTitle>{pkg}</DrawerTitle>
              <DrawerDescription className="flex justify-between">
                {details?.Description || "No description available"}
                <HoverCard>
                  <HoverCardTrigger>
                    <Info color="yellow" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[600px] shadow-sm shadow-primary">
                    <Label>{details?.Info}</Label>
                  </HoverCardContent>
                </HoverCard>
              </DrawerDescription>
            </DrawerHeader>
            <Card className="mx-[15%] border-t border-t-primary rounded-lg">
              <ul className="p-[4%] flex flex-col gap-4">
                {detailsList.map((item, index) => (
                  <li key={index} className="flex justify-between gap-14">
                    <span>
                      {item.value && item.name}
                      {item.value && ":"}
                    </span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <div className="py-5 mx-[14%] flex justify-between">
              <div className="flex flex-col items-start gap-3 w-3/4">
                <Label>Recommends:</Label>
                <div className="flex flex-wrap">
                  {details?.Recommends?.length === 0 && "No recommendations"}
                  {details?.Recommends?.map((item, index) => (
                    <DetailsDrawer
                      key={index}
                      pkg={item}
                      trigger={<Label>{item}</Label>}
                    />
                  ))}
                </div>
              </div>
              <DrawerClose className="space-x-3 w-fit">
                <Button>Add</Button>
                <Button variant="secondary">close</Button>
              </DrawerClose>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default DetailsDrawer;
