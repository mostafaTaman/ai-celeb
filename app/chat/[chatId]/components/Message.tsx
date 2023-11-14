import { Copy, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import CelebAvatar from "@/components/general/CelebAvatar";
import UserAvatar from "@/components/general/UserAvatar";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface props {
    role: "system" | "user",
    content?: string;
    isLoading?: boolean;
    src?: string;
}

const Message: React.FC<props> = ({ role, content, isLoading, src }) => {
    const handleCopy = () => {
        if (!content) return;

        navigator.clipboard.writeText(content);
        toast.success("Message Copied");
    };

    return (
        <div className={cn(
            "group flex items-start gap-x-3 py-4 w-full",
            role === "user" && "justify-end"
        )}>
            {role !== "user" && src && <CelebAvatar src={src} />}

            <div className="rounded-full px-4 py-2 max-w-sm text-sm bg-primary/10">
                {isLoading
                    ? <MoreHorizontal className="animate-pulse" />
                    : content
                }
            </div>

            {role === "user" && <UserAvatar />}

            {role !== "user" && !isLoading && (
                <Button
                    onClick={handleCopy}
                    className="opacity-0 group-hover:opacity-100 transition"
                    size="icon"
                    variant="ghost"
                >
                    <Copy className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
};

export default Message;