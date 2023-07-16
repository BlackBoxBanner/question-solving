"use client";

import {useState} from "react";
import {twMerge} from "tailwind-merge";
import {MdEditor, MdCatalog, MdPreview} from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import {useRouter} from "next/navigation";
import {MDXRemote} from "next-mdx-remote/rsc";

export interface EditorProps {
  title: string;
  description: string;
  id: string;
}

export default function Editor({description, title, id}: EditorProps) {
  const [data, setData] = useState<string>(description);
  const [questionTitle, setQuestionTitle] = useState<string>(title);
  const [view, setView] = useState(false);
  const router = useRouter();

  async function onSaveHandler() {
    const resPrommis = await fetch("/api/questions/edit", {
      method: "POST",
      body: JSON.stringify({question: data, id, title: questionTitle}),
    });

    if (resPrommis.ok) return router.push("/user");
  }

  return (
    <>
      <div className={twMerge("flex flex-col gap-4")}>
        <input
          className={"text-2xl bg-primary-light rounded p-1 px-2"}
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder={"Title"}
        />
        {!view ? (
          <MdEditor
            modelValue={data}
            onChange={setData}
            theme="dark"
            language="en-US"
            previewTheme="github"
            codeTheme="github"
            showCodeRowNumber={true}
            onSave={onSaveHandler}
            htmlPreview={false}
            preview={false}
            noMermaid={true}
            editorId={id}
          />
        ) : (
          <MdPreview
            modelValue={data}
            theme="dark"
            language="en-US"
            previewTheme="github"
            codeTheme="github"
            showCodeRowNumber={true}
            editorId={id}
          />
        )}
        <button
          className={twMerge(
            "bg-teritary hover:bg-teritary-hover rounded transition-colors duration-150 p-1 px-4"
          )}
          onClick={() => setView((e) => !e)}
        >
          View
        </button>
        <button
          className={twMerge(
            "bg-teritary hover:bg-teritary-hover rounded transition-colors duration-150 p-1 px-4"
          )}
          onClick={onSaveHandler}
        >
          Save
        </button>
      </div>
    </>
  );
}
