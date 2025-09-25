'use client'

import { useParams } from "next/navigation";


export default function ResumePreviewer() {
    const params = useParams()
    const userId = params?.user as string
    const resumeId = params?.resume as string

    return (
        <>
            {/* Resume Previewr */}
        </>
    )

}