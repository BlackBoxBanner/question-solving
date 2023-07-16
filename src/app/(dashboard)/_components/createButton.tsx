"use client";

import Link from "next/link";
import {twMerge} from "tailwind-merge";

export default function Button() {
  return (
    <>
      <Link
        href={"/dashboard/create"}
        className={twMerge(
          "px-4 p-1 bg-primary hover:bg-primary-hover transition-colors ease-in-out duration-150 rounded"
        )}
      >
        Create
      </Link>
    </>
  );
}
