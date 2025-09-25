'use client'

import useUserDetails from "@/hooks/useUserDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useParams } from "next/navigation"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { IconPlus, IconTrash, IconEyeFilled } from "@tabler/icons-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload";
import useUserResumes from "@/hooks/useUserResumes";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useCallback, useState } from "react";



export default function Dashboard() {
    const { user } = useParams();
    const { userDetails, loading, error } = useUserDetails({ userId: user as String });
    const { userResumes, resumeLoading, resumeError, resfreshResumes } = useUserResumes({ userId: user as String });
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleUploadSuccess = useCallback(() => {
        setIsDialogOpen(false)
        resfreshResumes();
    }, [resfreshResumes])

    return (
        <main className="min-h-fit h-full w-full max-w-full">
            <div className="flex gap-15 items-end">

                <Avatar>
                    <AvatarImage
                        src={`https://avatar.iran.liara.run/public/boy?username=${userDetails?.email}`}
                        className="!w-[6rem]"
                    />
                    <AvatarFallback
                        className="!w-[6-rem] max-w-[6rem] !h-[6rem] max-h-[6rem] !aspect-square bg-muted-foreground rounded-full flex items-center justify-center font-semibold text-secondary align-middle text-5xl"
                    >
                        {userDetails?.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <h1>Welcome back, <br /> <span className="font-extrabold text-4xl"> {userDetails?.email.split('@')[0]} </span></h1>
            </div>


            <div className="w-full flex justify-between items-center h-fit mt-15">
                <h3 className="font-bold text-lg text-muted-foreground">Browse your resumes </h3>


                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                        <div className="ml-4 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive p-2">
                            <IconPlus />
                            Add Resume
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="hidden"> Are you absolutely sure? </DialogTitle>

                            {/* WIP: Close dialog after pdf upload */}
                            {/* WIP: Refresh resumes list here */}
                            <FileUpload onUploadSuccess={handleUploadSuccess} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>


            <Table className="mt-5">
                <TableHeader className="font-bold">
                    <TableRow>
                        <TableHead className="w-[30%]">Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                {
                    resumeLoading ?
                        <TableBody>
                            {
                                [...Array(5)].map((row, key) => (
                                    <TableRow key={key}>
                                        {
                                            [...Array(5)].map((item, key) => (
                                                <TableCell key={key}>
                                                    <Skeleton className="h-5 rounded-4xl w-full" />
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        : <TableBody>
                            {
                                userResumes.map((resumeItem, key) => (
                                    <TableRow className="text-sm text-muted-foreground hover:text-foreground cursor-pointer" key={key}>
                                        <TableCell>{resumeItem.name}</TableCell>
                                        <TableCell>{Math.round(((resumeItem.size as number) / 1024)).toString()} KB</TableCell>
                                        <TableCell>{(new Date(resumeItem.updatedAt as string).toLocaleString()).toString()}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={resumeItem.status == 'Approved' ? "bg-green-400/10" : resumeItem.status == 'Pending' ? 'bg-amber-400/10' : 'bg-red-600/10'}
                                                asChild>
                                                <div className="flex gap-2">
                                                    <div className={cn(
                                                        'rounded-full aspect-square w-2',
                                                        resumeItem.status == 'Approved' ? "bg-green-400" : resumeItem.status == 'Pending' ? 'bg-amber-400' : 'bg-red-600'
                                                    )}></div>
                                                    <p>Under Review</p>
                                                </div>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <IconTrash className="w-5 hover:text-destructive" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                }
            </Table>



        </main>
    )
}
