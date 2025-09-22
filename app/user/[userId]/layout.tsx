"use client";


import React, { Children, useEffect, useState } from "react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useParams, useSearchParams } from "next/navigation";



export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-screen h-screen overflow-hidden">
            <SidebarDemo children={children} />
        </main>
    );
}



export function SidebarDemo({ children }: Readonly<{ children: React.ReactNode }>) {
    
    // WIP: get rid of email AuthO
    const {userId} = useParams();

    

    const links = [
        {
            label: "Dashboard",
            href: `/user/${userId}/`,
            icon: (
                <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Profile",
            href: `/user/${userId}/profile`,
            icon: (
                <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            href: "/",
            icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "mx-auto flex w-screen h-screen  flex-1 flex-col overflow-hidden border  md:flex-row",
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    {/* <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <img
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div> */}
                </SidebarBody>
            </Sidebar>
            <Dashboard children={children} />
        </div>
    );
}

// Dummy dashboard component with content
const Dashboard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="flex h-full w-full flex-1 flex-col gap-2 border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 overflow-y-scroll p-3 md:p-7 pb-0 md:pb-0 overflow-x-hidden">
            {children}
        </div>
    );
};



export const Logo = () => {
    return (
        <a
            // href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white opacity-40" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                CareerScore
            </motion.span>
        </a>
    );
};

export const LogoIcon = () => {
    return (
        <a
            // href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white opacity-40" />
        </a>
    );
};
