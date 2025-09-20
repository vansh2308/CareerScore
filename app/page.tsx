
import { BackgroundBeams } from "@/components/ui/background-beams";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React from "react";

export default function Home() {


  return (
    <div className="h-screen w-screen bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="mx-auto p-4 flex flex-col justify-center">
        <h1 className="relative z-10 text-[5rem]  bg-clip-text text-transparent bg-gradient-to-l from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          CareerScore
        </h1>

        <span className="text-neutral-500 max-w-lg mx-auto my-2 text-xl text-center relative z-10">
          Know where your resume stands before the recruiter does.
        </span>


        <PlaceholdersAndVanishInput
          placeholders={["Just type in your email to get started"]}
        />


      </div>
      <BackgroundBeams />
    </div>
  );
}
