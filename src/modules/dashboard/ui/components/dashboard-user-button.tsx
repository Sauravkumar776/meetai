import { authClient } from "@/lib/auth-client"
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
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { user } from "@/db/schema";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {  ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();
    
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

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
                {
                    data?.user.image ? (
                        <Avatar>
                            <AvatarImage src={data.user.image} alt={data.user.name} className="h-8 w-8 rounded-full" />
                        </Avatar>
                    )
                        : 
                            <GeneratedAvatar
                                seed={data.user.name || data.user.email || "U"}
                                variant="botttsNeutral"
                                className="size mr-3"
                            />

                }

                <div className="flex flex-col gap-1 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">
                        {data.user.name}
                    </p>
                    <p className="text-xs leading-none truncate">
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
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                    Billing
                    <CreditCardIcon />
                </DropdownMenuItem>
                <DropdownMenuGroup>
                    <DropdownMenuItem 
                        onSelect={onLogout}
                        className="cursor-pointer flex items-center justify-between"
                    >
                        Sign out
                       <LogOutIcon />
                    </DropdownMenuItem>
                </DropdownMenuGroup>    
            </DropdownMenuContent>
        </DropdownMenu>
    )
}