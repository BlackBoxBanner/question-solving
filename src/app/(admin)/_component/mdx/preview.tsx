"use client"

import {MdPreview} from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import {twMerge} from "tailwind-merge";


interface PreviewProps {
  description: string
}

export function Preview({description}: PreviewProps) {
  return (
    <>
      <div className={twMerge("bg-primary-hover")}>
        <MdPreview
          modelValue={description}
          theme="dark"
          language="en-US"
          previewTheme="github"
          codeTheme="github"
          style={{
            all: "unset"
          }}
          className={twMerge("")}
        />
      </div>
    </>
  )
}