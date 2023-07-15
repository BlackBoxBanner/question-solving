import type {MDXComponents} from 'mdx/types'
import {twMerge} from "tailwind-merge";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({children}) => <h1 style={{fontSize: "50px"}}>{children}</h1>,
    code: ({children}) => <div style={{
      backgroundColor: "rgb(51,51,51)",
      color: "#c4c4c4",
      borderRadius: "0.5rem",
      padding: "1rem",
      fontFamily: "monospace",
      margin: "1rem",
      maxWidth: "50rem",
      maxHeight: "20rem",
      overflow: "auto",
    }}>{children}</div>,
    ...components,
  }
}