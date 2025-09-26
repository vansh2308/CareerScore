'use client'

import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import ChatMessage from "@/components/ui/chatMessage";
import useResumeDetails from "@/hooks/useResumeDetails";
import useUserDetails from "@/hooks/useUserDetails";
import { addResumeMessage, updateResumeScore } from "@/lib/resumeBucket";
import { toast } from "sonner";
import useResumeMessages from "@/hooks/useResumeMessages";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    IconLayoutGrid,
    IconTarget,
    IconTextSize,
    IconKey,
    IconSum
} from '@tabler/icons-react'



export default function ResumePreviewer() {
    const params = useParams()
    const userId = params?.user as string
    const { userDetails } = useUserDetails({ userId })
    const resumeId = params?.resume as string
    const statusList = ['Pending', 'Approved', 'Rejected', 'Needs Revision']
    const { resumeDetails, setResumeDetails, resumeLaoding } = useResumeDetails({ resumeId })
    const [newMessage, setNewMessage] = useState<string>('')
    const chatBoxRef = useRef<HTMLDivElement>(null)
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const { resumeMessages, setResumeMessages, resumeMessagesLoading } = useResumeMessages({ resumeId })

    useEffect(() => {
        if (firstRender) {
            setTimeout(() => {
                setFirstRender(false)
            }, 1000);
            return
        }

        setTimeout(() => {
            if (chatBoxRef.current) {
                chatBoxRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }, [resumeMessages])



    const sendMessageHandler = async () => {
        try {
            if (!newMessage.trim()) return
            const { error } = await addResumeMessage(resumeId, newMessage, userDetails?.role == 'admin' ? 'admin' : 'owner');

            if (error) {
                throw error
            }

            setResumeMessages([...resumeMessages, {
                by: userDetails?.role == 'admin' ? 'admin' : 'owner',
                content: newMessage,
                timestamp: (new Date()).toUTCString()
            }])

            setNewMessage('')
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="w-full h-full mni-h-max flex flex-col gap-3 pl-2">
            <h1 className="text-2xl font-bold">
                {
                    userDetails?.role! == 'admin' ?
                        "Score this resume"
                        :
                        userDetails?.role == 'regular' ?
                            "Your Resume Score"
                            :
                            <Skeleton className="w-full h-10 rounded-xl" />
                }
            </h1>

            {
                resumeLaoding ?
                    <>
                        <Skeleton className="w-full h-32 rounded-xl" />
                        <Skeleton className="w-full h-10 mt-5 rounded-xl" />
                    </>
                    :
                    userDetails?.role == 'admin' ?
                        <div className="grid grid-cols-4 grid-rows-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-extrabold text-muted-foreground"> Structure </h4>
                                <div className="flex items-center gap-3">

                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={resumeDetails?.score?.structureScore || ''}
                                        placeholder={resumeDetails?.score ? resumeDetails?.score?.structureScore.toString() : '0'}
                                        readOnly={userDetails?.role != 'admin'}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '') {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        structureScore: 0
                                                    }
                                                });
                                                return;
                                            }

                                            const numValue = parseInt(value);
                                            if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        structureScore: numValue
                                                    }
                                                });
                                                return;
                                            }
                                        }}
                                    />
                                    <span className="text-xs font-bold text-muted-foreground min-w-max">/ 100</span>
                                </div>

                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-extrabold text-muted-foreground"> Relevance </h4>
                                <div className="flex items-center gap-3">

                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={resumeDetails?.score?.relevanceScore || ''}
                                        placeholder={resumeDetails?.score ? resumeDetails?.score?.relevanceScore.toString() : '0'}
                                        readOnly={userDetails?.role != 'admin'}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '') {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        relevanceScore: 0
                                                    }
                                                });
                                                return;
                                            }

                                            const numValue = parseInt(value);
                                            if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        relevanceScore: numValue
                                                    }
                                                });
                                                return;
                                            }
                                        }}
                                    />
                                    <span className="text-xs font-bold text-muted-foreground min-w-max">/ 100</span>
                                </div>

                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-extrabold text-muted-foreground"> Formatting </h4>
                                <div className="flex items-center gap-3">

                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={resumeDetails?.score?.formattingScore || ''}
                                        placeholder={resumeDetails?.score ? resumeDetails?.score?.formattingScore.toString() : '0'}
                                        readOnly={userDetails?.role != 'admin'}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '') {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        formattingScore: 0
                                                    }
                                                });
                                                return;
                                            }

                                            const numValue = parseInt(value);
                                            if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        formattingScore: numValue
                                                    }
                                                });
                                                return;
                                            }
                                        }}
                                    />
                                    <span className="text-xs font-bold text-muted-foreground min-w-max">/ 100</span>
                                </div>

                            </div>


                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-extrabold text-muted-foreground"> Keywords </h4>
                                <div className="flex items-center gap-3">

                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={resumeDetails?.score?.keywordsScore || ''}
                                        readOnly={userDetails?.role != 'admin'}
                                        placeholder={resumeDetails?.score ? resumeDetails?.score?.keywordsScore.toString() : '0'}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '') {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        keywordsScore: 0
                                                    }
                                                });
                                                return;
                                            }

                                            const numValue = parseInt(value);
                                            if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                                                setResumeDetails({
                                                    ...resumeDetails!,
                                                    score: {
                                                        ...resumeDetails?.score!,
                                                        keywordsScore: numValue
                                                    }
                                                });
                                                return;
                                            }
                                        }}
                                    />
                                    <span className="text-xs font-bold text-muted-foreground min-w-max">/ 100</span>
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-extrabold text-muted-foreground"> Total </h4>
                                <div className="flex items-center gap-3">

                                    <Input
                                        type="number"
                                        min={0}
                                        max={400}
                                        readOnly
                                        value={resumeDetails?.score?.keywordsScore! + resumeDetails?.score?.relevanceScore! + resumeDetails?.score?.structureScore! + resumeDetails?.score?.formattingScore! || ''}
                                        placeholder={resumeDetails?.score ? (resumeDetails?.score?.keywordsScore + resumeDetails?.score?.relevanceScore + resumeDetails?.score?.structureScore + resumeDetails?.score?.formattingScore).toString() : '0'}
                                    />
                                    <span className="text-xs font-bold text-muted-foreground min-w-max">/ 400</span>
                                </div>

                            </div>

                            <Select
                                onValueChange={(val: 'Pending' | 'Approved' | 'Rejected' | 'Needs Revision') => setResumeDetails({
                                    ...resumeDetails!,
                                    status: val
                                })}
                            >
                                <SelectTrigger className={cn(
                                    "self-end w-full col-span-2",
                                    userDetails?.role != 'admin' ? 'hidden' : ''
                                )}>
                                    <SelectValue placeholder="Change Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        statusList.map((item, key) => (
                                            <SelectItem value={item} key={key}>{item}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>

                            <Button
                                variant='default'
                                className={cn(
                                    "self-end cursor-pointer bg-blue-400/20 !text-blue-400 hover:bg-blue-400 hover:!text-background text- ml-4",
                                    userDetails?.role != 'admin' ? 'hidden' : ''
                                )}

                                onClick={async () => {
                                    setResumeDetails({
                                        ...resumeDetails!,
                                        updatedAt: (new Date()).toUTCString()
                                    })
                                    resumeDetails && await updateResumeScore(resumeId, resumeDetails)
                                    toast("Resume scored!")
                                }}
                            >
                                Submit
                            </Button>
                        </div>

                        :

                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted !font-extrabold">
                                    <TableHead className="font-extrabold pl-8">Metric</TableHead>
                                    <TableHead className="text-right font-extrabold pr-8">Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="flex items-center gap-2">
                                        <IconLayoutGrid className="w-4 h-4 text-muted-foreground" />
                                        Structure
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        {resumeDetails?.score?.structureScore || 0}/100
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex items-center gap-2">
                                        <IconTarget className="w-4 h-4 text-muted-foreground" />
                                        Relevance
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        {resumeDetails?.score?.relevanceScore || 0}/100
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex items-center gap-2">
                                        <IconTextSize className="w-4 h-4 text-muted-foreground" />
                                        Formatting
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        {resumeDetails?.score?.formattingScore || 0}/100
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex items-center gap-2">
                                        <IconKey className="w-4 h-4 text-muted-foreground" />
                                        Keywords
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        {resumeDetails?.score?.keywordsScore || 0}/100
                                    </TableCell>
                                </TableRow>
                                <TableRow className="font-bold bg-muted">
                                    <TableCell className="flex items-center gap-2 pr-8">
                                        <IconSum className="w-4 h-4" />
                                        Total Score
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        {(resumeDetails?.score?.structureScore || 0) +
                                            (resumeDetails?.score?.relevanceScore || 0) +
                                            (resumeDetails?.score?.formattingScore || 0) +
                                            (resumeDetails?.score?.keywordsScore || 0)}/400
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>


            }

            <Separator className='!h-[2px] my-5' decorative />

            <h1 className="text-2xl font-bold">Comments</h1>

            <div className="w-full h-fit flex flex-col gap-7 justify-between">
                <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-scroll" ref={chatBoxRef}>
                    {
                        resumeMessagesLoading ?
                            [...Array(5)].map((item, key) => (
                                <Skeleton key={key} className={cn(
                                    'rounded-lg p-4 h-24 flex flex-col w-3/4',
                                    key % 2 == 1 ? 'self-end' : ''

                                )} />
                            ))

                            : resumeMessages.map((item, key) => (
                                <ChatMessage key={key} message={item} resumeOwner={resumeDetails?.ownerName! as string} />
                            ))
                    }
                </div>

                <div className="grid w-full gap-2">
                    <Textarea
                        placeholder="Type your message here."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    />
                    <Button
                        onClick={sendMessageHandler}
                        className="cursor-pointer"
                    >
                        Send message
                    </Button>
                </div>

            </div>



        </div>
    )

}