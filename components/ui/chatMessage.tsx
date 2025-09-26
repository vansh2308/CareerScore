'use client'

import { cn } from "@/lib/utils";
import { ResumeMessage } from "@/types";


export default function ChatMessage({
    message,
    resumeOwner
}: {
    message: ResumeMessage,
    resumeOwner: string
}) {
    return (
        <div className={cn(
            'rounded-lg p-4 flex flex-col w-3/4',
            message.by == 'admin' ? 'bg-white/90 text-background' : 'bg-muted text-muted-foreground self-end'
        )}>
            <span className={cn(
                "text-xs font-black mb-3",
            )}>{message.by == 'admin' ? 'admin' : resumeOwner ? resumeOwner.split('@')[0] : 'owner'}</span>
            <p className="font-medium text-[0.85rem]">
                {message.content}
            </p>

            <span
                className="text-xs self-end mt-2 font-bold opacity-40"
                suppressHydrationWarning={true}
            >
                {message.timestamp}
            </span>

        </div>
    )
}