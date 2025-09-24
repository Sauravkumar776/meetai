"use client"

import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { BotIcon, Import, StarIcon, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardUserButton } from "./dashboard-user-button"

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]
export const DashboardSidebar = () => {

    const pathName = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src='/logo.svg' alt="Meet.AI" width={36} height={36} />
                    <p className="text-2xl font-bold">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2 mb-4">
                <Separator className="opacity-50 text-[#5D6B68]" />
            </div>
            <SidebarContent>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {firstSection.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                    pathName === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                                )}
                                    isActive={pathName === item.href}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="size-5" />
                                        <span className="text-sm font-medium tracking-light"> {item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            <div className="px-4 py-2">
                <Separator className="opacity-50 text-[#5D6B68]" />
            </div>
                <SidebarGroupContent className="">
                    <SidebarMenu>
                        {secondSection.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                    pathName === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                                )}
                                    isActive={pathName === item.href}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="size-5" />
                                        <span className="text-sm font-medium tracking-light"> {item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>

            <SidebarFooter className="text-white">
                <DashboardUserButton />
            </SidebarFooter>

        </Sidebar>
    )
}

export default DashboardSidebar;    