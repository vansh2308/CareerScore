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
                        className="!w-[6-rem] max-w-[6rem] aspect-square bg-muted-foreground rounded-full flex items-center justify-center font-semibold text-secondary align-middle text-3xl"
                    >
                        {userDetails?.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <h1>Welcome back, <br /> <span className="font-extrabold text-4xl"> {userDetails?.email.split('@')[0]} </span></h1>
            </div>


            <h3 className="mt-15 font-bold text-lg text-muted-foreground">Browse your resumes</h3>

            <Table className="mt-2">
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
