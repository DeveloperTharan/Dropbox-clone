"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import TrashMenu from "./TrashMenu";

export default function TrashItems() {
  const { userId } = useAuth();

  const getTrash = useQuery(api.file.getAchive, { userID: userId! as string });

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="flex  flex-row flex-wrap justify-normal items-center gap-5">
      {getTrash?.map((file) => {
        const type = file?.type;
        const extension = type.split("/")[1];

        return (
          <Card
            className="w-full h-full max-w-fit max-h-fit border-0 group"
            key={file?._id}
          >
            <CardHeader className="flex flex-col justify-center items-center p-2">
              <TrashMenu id={file?._id}>
                <MoreHorizontal
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-gray-200 
                  dark:hover:bg-black p-1 rounded-[5px]"
                />
              </TrashMenu>
              <Link
                href={file?.url}
                target="_blank"
                className="flex flex-col gap-y-4 justify-center items-center p-2"
              >
                <CardTitle className="h-12 w-12">
                  <FileIcon
                    extension={extension}
                    labelColor={FileColorExtension[extension]}
                    //@ts-ignore
                    {...defaultStyles[extension]}
                  />
                </CardTitle>
                <CardDescription>
                  {truncate(`${file?.name}`, 12)}
                </CardDescription>
              </Link>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
