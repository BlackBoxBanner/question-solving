"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css"
import {twMerge} from "tailwind-merge";

interface PreviewProps {
  description?: string;
}

export function Preview({description}: PreviewProps) {
  return <ReactMarkdown
    /* eslint-disable-next-line react/no-children-prop */
    children={String(description)}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    className={twMerge("bg-primary-hover md:min-h-[30rem] min-h-[25rem] p-1", "markdown-body")}
  />
}
