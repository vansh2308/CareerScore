import { Separator } from "@radix-ui/react-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import useAllResumes from "@/hooks/useAllResumes";
import { Skeleton } from "./skeleton";
import { ResumeType } from "@/types";


// WIP: Add self refresh 

export default function Leaderboard() {
    const { resumeList, resumeListLoading  }  = useAllResumes()

    const totalScore = (resumeItem: ResumeType) => {
        return resumeItem.score.formattingScore + resumeItem.score.keywordsScore + resumeItem.score.relevanceScore + resumeItem.score.structureScore
    }


    return (
        <>
            <Separator className="h-3" />

            <h3 className="mt-20 font-bold text-lg text-muted-foreground">Leaderboard 🔥</h3>

            <Table className="mt-3">
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>

                {
                    resumeListLoading ?
                    <TableBody>
                        {
                            [...Array(5)].map((row, key) => (
                                <TableRow key={key}>
                                    {
                                        [...Array(4)].map((item, key) => (
                                            <TableCell key={key}>
                                                <Skeleton className="h-5 rounded-4xl w-full" />
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody> : 

                    <TableBody>
                        {
                            resumeList.filter((item) => item.status == 'Approved')
                            .sort((a, b) => totalScore(b) - totalScore(a) )
                            .slice(0, 10)
                            .map((resumeItem, key) => (
                                <TableRow key={key} className="text-sm text-muted-foreground hover:text-foreground ">
                                    <TableCell>{key+1}</TableCell>
                                    <TableCell>{resumeItem.name.split('.')[0]}</TableCell>
                                    <TableCell>{resumeItem.ownerName.split('@')[0]}</TableCell>
                                    <TableCell>{totalScore(resumeItem).toString()}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                }

            </Table>
        </>
    )
}