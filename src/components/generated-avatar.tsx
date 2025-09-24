import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";

interface GeneratedAvatarProps {
    seed: string;
    className?: string;
    variant?: "botttsNeutral" | "initials";
}

export const GeneratedAvatar = ({ seed, className, variant}: GeneratedAvatarProps) => {
    const avatar = createAvatar(variant === "botttsNeutral" ? botttsNeutral : initials, {
        seed: seed
    });


    return (
        <Avatar>
            <AvatarImage  className={cn(className)} src={avatar.toDataUri()}/>
            <AvatarFallback className={cn("h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-medium", className)} >
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}