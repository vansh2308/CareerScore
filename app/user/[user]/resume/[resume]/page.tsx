'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResumeMessage, ScoreType } from "@/types";
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



export default function ResumePreviewer() {
    const params = useParams()
    const userId = params?.user as string
    const { userDetails } = useUserDetails({ userId })
    const resumeId = params?.resume as string
    const statusList = ['Pending', 'Approved', 'Rejected', 'Needs Revision']
    const { resumeDetails, setResumeDetails, resumeLaoding, resumeError } = useResumeDetails({ resumeId })
    const [newMessage, setNewMessage] = useState<string>('')
    const chatBoxRef = useRef<HTMLDivElement>(null)
    const [ firstRender, setFirstRender ] = useState(true);

    const dummyResumeMessages: ResumeMessage[] = [
        {
            by: 'admin',
            content: "Hare krishna Hare Krishna",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'owner',
            content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'admin',
            content: "Hare krishna Hare Krishna",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'owner',
            content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'admin',
            content: "Hare krishna Hare Krishna",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'owner',
            content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'admin',
            content: "Hare krishna Hare Krishna",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'owner',
            content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'admin',
            content: "Hare krishna Hare Krishna",
            timestamp: (new Date()).toUTCString()
        },
        {
            by: 'owner',
            content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
            timestamp: (new Date()).toUTCString()
        },
    ]

    const [resumeMessages, setResumeMessages] = useState<ResumeMessage[]>(dummyResumeMessages)

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
            return; 
        }

        if (chatBoxRef.current) {
            chatBoxRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [resumeMessages])



    return (
        <div className="w-full h-full mni-h-max flex flex-col gap-3 pl-2">
            <h1 className="text-2xl font-bold">Score this resume</h1>

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
                    <SelectTrigger className="self-end w-full col-span-2">
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
                    className="self-end cursor-pointer bg-blue-400/20 !text-blue-400 hover:bg-blue-400 hover:!text-background text- ml-4">
                    Submit
                </Button>
            </div>

            <Separator className='!h-[2px] my-5' decorative />

            <h1 className="text-2xl font-bold">Comments</h1>

            <div className="w-full h-fit flex flex-col gap-7 justify-between">
                <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-scroll" ref={chatBoxRef}>
                    {
                        resumeMessages.map((item, key) => (
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
                        onClick={() => setResumeMessages([...resumeMessages, {
                            by: userDetails?.role == 'admin' ? 'admin' : 'owner',
                            content: newMessage,
                            timestamp: (new Date()).toUTCString()
                        }])}
                        className="cursor-pointer"
                    >
                        Send message
                    </Button>
                </div>

            </div>



        </div>
    )

}