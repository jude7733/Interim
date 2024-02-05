import { DataContext } from "@/context/DataContext";import { useContext } from "react";
}
export const Terminal = () => {
    const { output } = useContext(DataContext);
    return (
        <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">{ output}</span>
        </div>
    );
    }