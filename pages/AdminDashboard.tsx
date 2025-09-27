

// WIP: Limit 5 resumes/user 

'use client'

import useUserDetails from "@/hooks/useUserDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IconPencil, IconRefresh, IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useAllResumes from "@/hooks/useAllResumes";
import { ResumeType } from "@/types";
import Link from "next/link";
import Leaderboard from "@/components/ui/leaderboard";



export default function AdminDashboard({ user }: { user: string }) {
    const { userDetails } = useUserDetails({ userId: user });
    const { resumeList, resumeListLoading, resfreshResumes } = useAllResumes()
    const [resumeListDesc, setResumeListDesc] = useState<boolean>(true)
    const [statusFilters, setStatusFilter] = useState<string[]>([])
    const [resumeListCopy, setReumseListCopy] = useState<ResumeType[]>(resumeList)
    const filterList = ['Pending', 'Approved', 'Rejected', 'Needs Revision']


    useEffect(() => {
        setReumseListCopy(resumeList)
    }, [resumeList])


    useEffect(() => {
        setReumseListCopy((resumeListCopy) => resumeListCopy.toSorted((a, b) => (
            (resumeListDesc ? -1 : 1) * (new Date(a.updatedAt as string).getTime() - new Date(b.updatedAt as string).getTime())
        )))
    }, [resumeListDesc])


    useEffect(() => {
        if (statusFilters.length == 0) {
            setReumseListCopy(resumeList)
        } else {
            setReumseListCopy(() => (
                resumeList.filter((resume) => statusFilters.includes(resume.status))
            ))
        }
    }, [statusFilters])


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

                <h1>
                    Welcome back, <br />
                    <span className="font-extrabold text-4xl"> {userDetails?.email.split('@')[0]} </span>
                    <Badge variant='secondary' className="ml-3 bg-violet-500/20 text-violet-400">Admin</Badge>
                </h1>
            </div>


            <div className="w-full flex justify-between items-center h-fit mt-15">
                <div className="flex gap-3">
                    <h3 className="font-bold text-lg text-muted-foreground">Browse all resumes </h3>
                    <button onClick={resfreshResumes}>
                        <IconRefresh className="w-[1rem] cursor-pointer hover:animate-[spin_1s_ease-in-out] text-muted-foreground hover:text-foreground" />
                    </button>
                </div>

                <ul className="flex gap-4">
                    {
                        filterList.map((filterVal, key) => (
                            <Badge
                                variant="secondary"
                                key={key}
                                className={cn(
                                    'py-2 px-5 rounded-full cursor-pointer',
                                    statusFilters.includes(filterVal) ? (
                                        filterVal == 'Approved' ? "bg-green-400/10 border-green-400" : filterVal == 'Pending' ? 'bg-amber-400/10 border-amber-400' : filterVal == 'Needs Revision' ? 'bg-sky-600/10 border-sky-500' : 'bg-red-600/10 border-red-600') : 'bg-muted'
                                )}
                                asChild
                                onClick={() => {
                                    if (statusFilters.includes(filterVal)) {
                                        setStatusFilter(statusFilters.filter((val) => val != filterVal))
                                    } else {
                                        setStatusFilter([...statusFilters, filterVal])
                                    }
                                }}
                            >

                                <div className="flex gap-2">
                                    <p className={cn(
                                        statusFilters.includes(filterVal) ? (
                                            filterVal == 'Approved' ? "text-green-400" : filterVal == 'Pending' ? 'text-amber-400' : filterVal == 'Needs Revision' ? 'text-sky-500' : 'text-red-600') : 'text-muted-foreground'

                                    )}>{filterVal}</p>
                                </div>
                            </Badge>
                        ))
                    }
                </ul>
            </div>


            <Table className="mt-5  overflow-y-scroll">
                <TableHeader className="font-bold">
                    <TableRow>
                        <TableHead className="min-w-max">Name</TableHead>
                        <TableHead className="min-w-max">Owner</TableHead>
                        <TableHead className="w-[5%]">Size</TableHead>
                        <TableHead className="mr-5 flex gap-2 items-center">
                            Last Updated
                            {resumeListDesc ?
                                <IconArrowDown
                                    className="w-[1rem] cursor-pointer"
                                    onClick={() => setResumeListDesc(!resumeListDesc)}
                                />
                                : <IconArrowUp
                                    className="w-[1rem] cursor-pointer"
                                    onClick={() => setResumeListDesc(!resumeListDesc)}
                                />}
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[5%]"></TableHead>
                    </TableRow>
                </TableHeader>

                {
                    resumeListLoading ?
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
                                resumeListCopy.map((resumeItem, key) => (
                                    <TableRow className="text-sm text-muted-foreground hover:text-foreground cursor-pointer" key={key}>
                                        <TableCell>{resumeItem.name}</TableCell>
                                        <TableCell>{resumeItem.ownerName.split('@')[0]}</TableCell>
                                        <TableCell>{Math.round(((resumeItem.size as number) / 1024)).toString()} KB</TableCell>
                                        <TableCell>{(new Date(resumeItem.updatedAt as string).toLocaleString()).toString()}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={resumeItem.status == 'Approved' ? "bg-green-400/10" : resumeItem.status == 'Pending' ? 'bg-amber-400/10' : resumeItem.status == 'Needs Revision' ? 'bg-sky-600/10' : 'bg-red-600/10'}
                                                asChild>
                                                <div className="flex gap-2">
                                                    <div className={cn(
                                                        'rounded-full aspect-square w-2',
                                                        resumeItem.status == 'Approved' ? "bg-green-400" : resumeItem.status == 'Pending' ? 'bg-amber-400' : resumeItem.status == 'Needs Revision' ? 'bg-sky-500' : 'bg-red-600'
                                                    )}></div>
                                                    <p className={cn(
                                                        resumeItem.status == 'Approved' ? "text-green-400" : resumeItem.status == 'Pending' ? 'text-amber-400' : resumeItem.status == 'Needs Revision' ? 'text-sky-500' : 'text-red-600'
                                                    )}>
                                                        {resumeItem.status}
                                                    </p>
                                                </div>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/user/${user}/resume/${resumeItem.resumeId}`}>
                                                <IconPencil className="w-5" />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                }
            </Table>

            {
                resumeListCopy.length == 0 && !resumeListLoading &&
                <p className="w-full text-center mt-10 font-bold text-muted-foreground/30 text-sm ">{'You\'re all caught up!'}</p>
            }

            <Leaderboard />

        </main>
    )

}