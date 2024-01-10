import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SideMenu = () => {
  return (
    <Tabs
      defaultValue="backup"
      orientation="vertical"
      className="flex flex-row grow"
    >
      <div className="flex flex-col flex-initial m-1 border rounded-md p-1">
        <TabsList className="m-1">
          <TabsTrigger value="backup">
            &nbsp;&nbsp;Backup &nbsp;&nbsp;
          </TabsTrigger>
        </TabsList>
        <TabsList className="m-1">
          <TabsTrigger value="Categories">Categories</TabsTrigger>
        </TabsList>
        <TabsList className="m-1">
          <TabsTrigger value="settings">
            &nbsp;&nbsp;Settings &nbsp;
          </TabsTrigger>
        </TabsList>
        <TabsList className="m-1">
          <TabsTrigger value="about">
            &nbsp;&nbsp;&nbsp;About &nbsp;&nbsp;&nbsp;
          </TabsTrigger>
        </TabsList>
        <TabsList className="m-1">
          <TabsTrigger value="exit">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex flex-1 grow border rounded-md m-1">
        <TabsContent value="backup">
          <p className="m-3">Backup</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};
export default SideMenu;
