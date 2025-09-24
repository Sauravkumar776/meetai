import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon, UserIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription
} from "@/components/ui/drawer"

export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();
    const { isMobile } = useSidebar();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                }
            }
        });
    }
    
    if (isPending || !data?.user) {
        return null;
    }

    const UserAvatar = () => (
        data?.user.image ? (
            <Avatar>
                <AvatarImage src={data.user.image} alt={data.user.name} className="h-8 w-8 rounded-full" />
            </Avatar>
        ) : (
            <GeneratedAvatar
                seed={data.user.name || data.user.email || "U"}
                variant="botttsNeutral"
                className="mr-3"
            />
        )
    );

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <button className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2 transition-colors">
                        <UserAvatar />
                        <div className="flex flex-col gap-1 text-left overflow-hidden flex-1 min-w-0">
                            <p className="text-sm font-medium leading-none truncate">
                                {data.user.name}
                            </p>
                            <p className="text-xs leading-none truncate text-muted-foreground">       
                                {data.user.email}   
                            </p>
                        </div>
                        <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
                    </button>
                </DrawerTrigger>
                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent className="pb-6">
                        <DrawerHeader className="pb-4">
                            {/* Enhanced header with avatar */}
                            <div className="flex items-center gap-4 px-2">
                                <div className="scale-125 origin-left">
                                    {data?.user.image ? (
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={data.user.image} alt={data.user.name} />
                                        </Avatar>
                                    ) : (
                                        <GeneratedAvatar
                                            seed={data.user.name || data.user.email || "U"}
                                            variant="botttsNeutral"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <DrawerTitle className="text-base font-semibold">
                                        {data.user.name}
                                    </DrawerTitle>
                                    <DrawerDescription className="text-sm">
                                        {data.user.email}
                                    </DrawerDescription>
                                </div>
                            </div>
                        </DrawerHeader>
                        
                        <div className="px-4 space-y-1">
                            {/* Profile section */}
                            <div className="py-2">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 pb-2">
                                    Account
                                </p>
                                <button 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent/50 rounded-lg transition-colors group"
                                    onClick={() => router.push("/profile")}
                                >
                                    <UserIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    <span className="text-sm font-medium">Profile</span>
                                </button>
                                <button 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent/50 rounded-lg transition-colors group"
                                    onClick={() => router.push("/settings")}
                                >
                                    <SettingsIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    <span className="text-sm font-medium">Settings</span>
                                </button>
                                <button 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent/50 rounded-lg transition-colors group"
                                    onClick={() => router.push("/billing")}
                                >
                                    <CreditCardIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    <span className="text-sm font-medium">Billing</span>
                                </button>
                            </div>
                            
                            <Separator className="my-2" />
                            
                            {/* Sign out section */}
                            <div className="pt-2">
                                <button 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-500/10 text-red-600 hover:text-red-700 rounded-lg transition-colors group"
                                    onClick={onLogout}
                                >
                                    <LogOutIcon className="size-4" />
                                    <span className="text-sm font-medium">Sign out</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Optional footer with version or help links */}
                        <DrawerFooter className="pt-4 pb-2 px-4">
                            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                                <button className="hover:text-foreground transition-colors">
                                    Help
                                </button>
                                <span>•</span>
                                <button className="hover:text-foreground transition-colors">
                                    Privacy
                                </button>
                                <span>•</span>
                                <button className="hover:text-foreground transition-colors">
                                    Terms
                                </button>
                            </div>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2 transition-colors">
                <UserAvatar />
                <div className="flex flex-col gap-1 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">
                        {data.user.name}
                    </p>
                    <p className="text-xs leading-none truncate text-muted-foreground">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-72" side="right">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-y-1">
                        <p className="text-sm font-medium leading-none">
                            {data.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {data.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className="cursor-pointer flex items-center justify-between"
                    onSelect={() => router.push("/profile")}
                >
                    Profile
                    <UserIcon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem 
                    className="cursor-pointer flex items-center justify-between"
                    onSelect={() => router.push("/settings")}
                >
                    Settings
                    <SettingsIcon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem 
                    className="cursor-pointer flex items-center justify-between"
                    onSelect={() => router.push("/billing")}
                >
                    Billing
                    <CreditCardIcon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onSelect={onLogout}
                        className="cursor-pointer flex items-center justify-between text-red-600 focus:text-red-600"
                    >
                        Sign out
                        <LogOutIcon className="size-4" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}