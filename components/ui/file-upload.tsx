
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { uploadFile } from "@/lib/resumeBucket";
import { useParams } from "next/navigation";


const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const { user } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const fileInputRef = useRef<HTMLInputElement>(null);




  const handleFileChange = (newFiles: File[]) => {
    // setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (newFiles.length > 0) {

      if (newFiles[0].size > 1 * 1024 * 1024) {
        setErrorMessage("File Size greater than 1MB")
        return
      }
      setFiles([newFiles[0]])
      const url = URL.createObjectURL(newFiles[0]);
      setPreviewUrl(url)
      setErrorMessage("")
      onChange && onChange(newFiles);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl])

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      setFiles([])
      console.log(error);
      setErrorMessage(error[0].errors[0].code == "file-invalid-type" ? "Only .pdf accepted" : "File Size greater than 1MB")
    },
    accept: {
      'application/pdf': ['.pdf', 'application/pdf']
    },
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024
  });


  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();


    if(files[0] && errorMessage == '') {
      // WIP: Store file in bucket 
      console.log(files[0]);
      try {
        const {data, error} = await uploadFile(user as String, files[0]);
        if(error) throw error

        console.log(data)

      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          {
            errorMessage &&
            <p className="relative z-20 font-sans font-normal text-destructive text-xs mt-2">
              {errorMessage}
            </p>
          }
          <div className="relative w-full mt-5 max-w-xl mx-auto">

            {files.length > 0 && files[0] && previewUrl && (
              <>
                <div className="relative w-full aspect-[16/18] mt-0">
                  <object
                    data={`${previewUrl}#toolbar=0`}
                    type="application/pdf"
                    className="w-full h-full rounded-lg shadow-lg"
                  >
                    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                      <p className="text-gray-500">
                        PDF preview not available. <a href={previewUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Click here to open</a>
                      </p>
                    </div>
                  </object>
                </div>


                <motion.div
                  key="file0"
                  layoutId="file-upload"
                  className={cn(
                    "relative overflow-hidden z-40 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md !bg-transparent",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-neutral-700 dark:text-neutral-300 truncate max-w-xs text-sm"
                    >
                      {files[0].name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit shrink-0 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-xs md:flex-row flex-col items-start md:items-center w-full justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(files[0].lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>

                <Button
                  type="submit"
                  variant="default"
                  className="cursor-pointer w-full opacity-80 py-5 hover:opacity-100"
                  onClick={(e) => handleSubmit(e)}
                >
                  Upload
                </Button>

              </>
            )}


            {files.length == 0 && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${index % 2 === 0
                ? "bg-gray-50 dark:bg-neutral-950"
                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                }`}
            />
          );
        })
      )}
    </div>
  );
}
