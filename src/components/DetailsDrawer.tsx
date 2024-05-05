import { Info } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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

const DetailsDrawer = ({ pkg }: { pkg: string }) => {
  const [details, setDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    await getPackageDetails(pkg).then((data) => {
      setDetails(data as PackageDetails);
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
        <Button variant="outline" size="icon" onClick={handleFetch}>
          <Info color="yellow" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {loading ? (
          <LoadingSkeleton variant="update" />
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
              <ul className="p-[5%] flex flex-col gap-4">
                {detailsList.map((item, index) => (
                  <li key={index} className="flex justify-between gap-14">
                    <span>
                      {item.value && item.name}
                      {item.value && <>:</>}
                    </span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <DrawerFooter className="py-10 mr-[14%]">
              <DrawerClose className="flex justify-end gap-3">
                <Button>Add</Button>
                <Button variant="secondary">close</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default DetailsDrawer;
