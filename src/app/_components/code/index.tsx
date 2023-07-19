"use client";
import {twMerge} from "tailwind-merge";
import {ComponentProps} from "react";

interface CodeProps extends ComponentProps<"textarea"> {
}

export function Code({className, ...props}: CodeProps) {

  return (
    <>
      <div className={twMerge("w-full rounded ")}>
				<textarea
          className={twMerge("bg-primary-hover md:min-h-[30rem] min-h-[25rem] p-1", className)}
          {...props}
        />
      </div>
    </>
  );
}
