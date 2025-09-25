'use client'
import { Badge } from "@/components/ui/badge";
import useResumeDetails from "@/hooks/useResumeDetails";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";



export default function PreviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const params = useParams()
    const userId = params?.user as string
    const resumeId = params?.resume as string
    const { resumeDetails, resumeLaoding, resumeError } = useResumeDetails({ resumeId })

    useEffect(() => {
        console.log(resumeDetails)
    }, [resumeDetails])

    return (
        <div className="w-full flex flex-col overflow-hidden gap-3 min-h-max overflow-y-scroll pb-20">
            <div className="w-full flex justify-between items-end border-b-4  border-muted pb-4">
                <div className="flex flex-col gap-3">
                    <h1 className="font-extrabold text-4xl capitalize">{resumeDetails?.name.split('.')[0]}</h1>

                    {/* WIP: Replace ownerId by OwnerName  */}
                    <h3 className="font-medium text-lg text-muted-foreground">{resumeDetails?.ownerId}</h3>
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
            <div className="flex mt-10">


                <div className="relative w-full aspect-[16/13] mt-0">
                    <object
                        data={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${resumeDetails?.link}#toolbar=0&view=FitV`}
                        type="application/pdf"
                        className="w-[60%] h-full rounded-lg shadow-lg"
                    >
                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                            <p className="text-gray-500">
                                {/* PDF preview not available. <a href={previewUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Click here to open</a> */}
                            </p>
                        </div>
                    </object>
                </div>


                <div className="flex h-full w-full flex-1 flex-col gap-2 dark:border-neutral-700 overflow-y-scroll p-10 md:p-16 pb-0 md:pb-0 overflow-x-hidden">
                    {children}
                </div>

            </div>
        </div>
    );
}
