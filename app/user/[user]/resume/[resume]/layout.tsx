'use client'
import { Badge } from "@/components/ui/badge";
import useResumeDetails from "@/hooks/useResumeDetails";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// WIP: Add breadcrumb 



export default function PreviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const params = useParams()
    const userId = params?.user as string
    const resumeId = params?.resume as string
    const { resumeDetails, setResumeDetails, resumeLaoding, resumeError } = useResumeDetails({ resumeId })



    return (
        <div className="w-full flex flex-col overflow-hidden gap-3 min-h-max overflow-y-scroll pb-20">
            <div className="w-full flex justify-between items-end border-b-4  border-muted pb-4">
                <div className="flex flex-col gap-3">
                    <h1 className="font-extrabold text-4xl capitalize">{resumeDetails?.name.split('.')[0]}</h1>

                    {/* WIP: Replace ownerId by OwnerName  */}
                    <h3 className="font-bold text-[1rem] text-muted-foreground">{resumeDetails?.ownerName}</h3>
                </div>

                <div className="flex flex-col gap-3 items-end">
                    <Badge
                        variant="secondary"
                        className={resumeDetails?.status == 'Approved' ? "bg-green-400/10" : resumeDetails?.status == 'Pending' ? 'bg-amber-400/10' : resumeDetails?.status == 'Needs Revision' ? 'bg-sky-600/10' : 'bg-red-600/10'}
                        asChild>
                        <div className="flex gap-2">
                            <div className={cn(
                                'rounded-full aspect-square w-2',
                                resumeDetails?.status == 'Approved' ? "bg-green-400" : resumeDetails?.status == 'Pending' ? 'bg-amber-400' : resumeDetails?.status == 'Needs Revision' ? 'bg-sky-500' : 'bg-red-600'
                            )}></div>
                            <p className={cn(
                                resumeDetails?.status == 'Approved' ? "text-green-400" : resumeDetails?.status == 'Pending' ? 'text-amber-400' : resumeDetails?.status == 'Needs Revision' ? 'text-sky-500' : 'text-red-600'
                            )}>
                                {resumeDetails?.status}
                            </p>
                        </div>
                    </Badge>

                    <h3 className="font-light text-[0.8rem] text-muted-foreground">
                        <span className="font-bold">  Last Updated  </span>
                        {(new Date(resumeDetails?.updatedAt as string).toLocaleString()).toString()}
                    </h3>
                </div>
            </div>
            <div className="flex mt-10 gap-20">
                <div className="relative w-[50%] mt-0  ">

                    {resumeLaoding ? (
                        <div className="w-full aspect-[4/5] rounded-lg shadow-lg bg-muted flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
                        </div>
                    ) : resumeDetails?.link ? (
                        <object
                            data={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${resumeDetails.link}#toolbar=0&view=FitH`}
                            type="application/pdf"
                            className="w-full aspect-[4/5] rounded-lg shadow-lg"
                        >
                            <div className="flex items-center justify-center h-full bg-muted rounded-lg">
                                <p className="text-gray-500">
                                    PDF preview not available. <a
                                        href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${resumeDetails.link}`}
                                        className="text-blue-500 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Click here to open
                                    </a>
                                </p>
                            </div>
                        </object>
                    ) : (
                        <div className="w-full aspect-[4/5] rounded-lg shadow-lg bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">No PDF available</p>
                        </div>
                    )}
                </div>


                <div className="flex h-full w-full flex-1 flex-col gap-2 dark:border-neutral-700 overflow-y-scroll overflow-x-hidden">
                    {children}
                </div>

            </div>
        </div>
    );
}
