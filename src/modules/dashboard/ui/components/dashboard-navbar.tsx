"use client"

import { Button } from "@/components/ui/button";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import DashboardCommand from "@/modules/dashboard/ui/components/dashboard-command";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [commandOpen, setCommandOpen] = useState(false);


    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);


    return (
        <>
        <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
        <nav className="flex gap-x-2 py-3 border-b items-center px-4 bg-background">
            <Button className="size-9" variant="outline" onClick={toggleSidebar}>
                {(state === "collapsed" || isMobile) ? <PanelLeftIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4" />}
            </Button>
            <Button
                variant="outline"
                className="h-9 w-[240px] justify-start text-muted-foreground font-normal hover:text-muted-foreground"
                size="sm"
                onClick={() => { setCommandOpen((open) => !open) }}
            >
                <SearchIcon />
                Search 
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">&#8984; K</span>
                </kbd>
            </Button>
        </nav>
        </>
    )
}

export default DashboardNavbar;