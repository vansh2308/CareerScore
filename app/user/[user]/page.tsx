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
import { IconPlus } from "@tabler/icons-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload";



export default function Dashboard() {
    const { user } = useParams();
    const { userDetails, loading, error } = useUserDetails({ userId: user as String });


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


                <Dialog>
                    <DialogTrigger>
                        <div className="ml-4 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive p-2">
                            <IconPlus />
                            Add Resume
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="hidden"> Are you absolutely sure? </DialogTitle>
                            {/* WIP: File type regex */}
                            {/* WIP: File preview */}
                            <FileUpload />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <Table className="mt-5">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>



        </main>
    )
}
